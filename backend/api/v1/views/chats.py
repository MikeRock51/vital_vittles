#!/usr/bin/env python3
"""RESTFUL API actions for bot chats"""

from models import storage
from models.roles import UserRole
from flask import jsonify, abort, request, g
from api.v1.views import app_views
from api.v1.utils import Utils, VError
from api.v1.utils.authWrapper import login_required
from models.user import User
from models.chat.chat import Chat
from models.chat.chatSession import ChatSession
from models.chat.chatProvider import getChatResponse
import re
from flasgger.utils import swag_from
from os import path

DOCS_DIR = path.dirname(__file__) + '/documentations/recipes'


@app_views.route('/chat_sessions', methods=['POST'])
# @swag_from(f'{DOCS_DIR}/post_recipes.yml')
@login_required()
def createChatSession():
    """Creates a new chat session for the current user"""
    data = request.get_json()
    newSession = None

    try:
        newSession = storage.createChatSession(g.currentUser.id, data.get('topic'))
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": Utils.extractErrorMessage(str(e)),
            "data:": None
        }), 503

    return jsonify({
        "status": "success",
        "message": "Chat session created successfully",
        "data": newSession
    })

@app_views.route('/chat_sessions', methods=['GET'])
# @swag_from(f'{DOCS_DIR}/post_recipes.yml')
@login_required()
def getUserSessions():
    """Retrieves the authenticated user's chat sessions"""
    sessions = None
    try:
        sessions = storage.getUserSessions(g.currentUser.id)
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": Utils.extractErrorMessage(str(e)),
            "data:": None
        }), 503

    return jsonify({
        "status": "success",
        "message": "Chat sessions retrieved successfully",
        "data": sessions
    })

@app_views.route('/chats', methods=['GET'])
# @swag_from(f'{DOCS_DIR}/post_recipes.yml')
@login_required()
def getSessionChats():
    """Retrieves the chat history of a chat session"""
    requiredFields = ['sessionID']
    data = Utils.getReqJSON(request, requiredFields)
    
    chats = None
    try:
        chats = storage.getChatHistory(data['sessionID'], g.currentUser.id)
    except VError as e:
        abort(e.statusCode, description=str(e))

    return jsonify({
        "status": "success",
        "message": "Chat history retrieved successfully",
        "data": chats
    })

@app_views.route('/chats', methods=['POST'])
# @swag_from(f'{DOCS_DIR}/post_recipes.yml')
@login_required()
def processChat():
    """Processes user chat and returns response from the chatbot"""
    requiredFields = ['content', 'sessionID']
    try:
        data = Utils.getReqJSON(request, requiredFields)
        chatData = {}

        for key, value in data.items():
            if key in requiredFields:
                chatData[key] = value

        chatData['userID'] = g.currentUser.id
        chatData['role'] = 'user'
        
        chatHistory = storage.getChatHistory(chatData['sessionID'], g.currentUser.id)
        if chatHistory == []:
            abort(400, description="Invalid chat session!")

        newChat = Chat(**chatData)
        chatHistory = [{'role': chat.get('role'), 'content': chat.get(
            'content')} for chat in chatHistory]
        chatData.pop("userID")
        chatData.pop("sessionID")
        chatHistory.append(chatData)

        chatResponse = None
        try:
            chatResponse = getChatResponse(chatHistory)
            chatResponse['userID'] = g.currentUser.id
            chatResponse['sessionID'] = data['sessionID']
            chatResponse = Chat(**chatResponse)
            newChat.save()
            chatResponse.save()
        except Exception as e:
            return jsonify({
                "status": "error",
                "message": str(e),
                "data": None
            }), 503
    except (ValueError) as e:
        return jsonify({
            "status": "error",
            "message": Utils.extractErrorMessage(str(e))
        }), 400

    return jsonify({
        "status": "success",
        "message": "Response generated successfully",
        "data": chatResponse.toDict()
    })


# @app_views.route('/recipes/<id>', methods=['PUT'])
# @swag_from(f'{DOCS_DIR}/put_recipes.yml')
# @login_required()
# def updateRecipe(id):
#     """Updates the recipe with the id"""
#     recipe = storage.get(Recipe, id)
#     if not recipe:
#         abort(404, description="Recipe not found!")

#     nonUpdatables = ['id', 'userID', 'createdAt', 'updatedAt']
#     privilegedRoles = [UserRole.admin, UserRole.moderator, UserRole.editor]

#     if g.currentUser.id != recipe.userID and g.currentUser.role not in privilegedRoles:
#         abort(401, "Unauthorized access!")

#     try:
#         data = Utils.getReqJSON(request)
#         for key, value in data.items():
#             if key not in nonUpdatables and hasattr(Recipe, key):
#                 setattr(recipe, key, value)
#         recipe.save()
#     except (ValueError, Exception) as e:
#         return jsonify({
#             "status": "error",
#             "message": Utils.extractErrorMessage(str(e))
#         }), 400

#     return jsonify({
#         "status": "success",
#         "message": "Recipe updated successfully!",
#         "data": recipe.toDict(detailed=True)
#     })


# @app_views.route('/recipes/<id>', methods=['DELETE'])
# @swag_from(f'{DOCS_DIR}/delete_recipes.yml')
# @login_required()
# def deleteRecipe(id):
#     """Deletes the recipe with the id"""
#     recipe = storage.get(Recipe, id)
#     if not recipe:
#         abort(404)

#     privilegedRoles = [UserRole.admin, UserRole.moderator]
#     if g.currentUser.id != recipe.userID and g.currentUser.role not in privilegedRoles:
#         abort(401)

#     storage.delete(recipe)

#     return jsonify({
#         "status": "success",
#         "message": "Recipe deleted successfully!"
#     }), 200
