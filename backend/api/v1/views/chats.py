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

@app_views.route('/chat_sessions', methods=['PUT'])
# @swag_from(f'{DOCS_DIR}/post_recipes.yml')
@login_required()
def updateChatSession():
    """Updates a chat session based on sessionID"""
    requiredFields = ['topic', 'sessionID']
    data = Utils.getReqJSON(request, requiredFields)
    session = None

    try:
        session = storage.get(ChatSession, data['sessionID'])
        if not session:
            raise VError("Chat session not found", 404)
        elif session.userID != g.currentUser.id:
            raise VError("You are not authorized to access this chat session", 401)
        
        setattr(session, 'topic', data.get('topic'))
        session.save()
    except VError as e:
        return jsonify({
            "status": "error",
            "message": str(e),
            "data:": None
        }), e.statusCode
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": Utils.extractErrorMessage(str(e)),
            "data:": None
        }), 503

    return jsonify({
        "status": "success",
        "message": "Chat session updated successfully",
        "data": session.toDict()
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
