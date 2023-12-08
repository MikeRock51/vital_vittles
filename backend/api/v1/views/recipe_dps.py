#!/usr/bin/env python3
"""RESTFUL API actions for recipes"""

from models.recipe import Recipe
from models.recipeDP import RecipeDP
from models import storage
from models.roles import UserRole
from flask import jsonify, abort, request, g, current_app, make_response, send_from_directory
from api.v1.views import app_views
from api.v1.utils import Utils
from api.v1.utils.authWrapper import login_required
import re
from flasgger.utils import swag_from
from os import path
from sqlalchemy.exc import IntegrityError

DOCS_DIR = path.dirname(__file__) + '/documentations/recipes'


@app_views.route('/recipes/dps', methods=['PUT'])
# @swag_from(f'{DOCS_DIR}/post_users.yml')
@login_required()
def uploadRDP():
    """Uploads recipes Display Picture"""
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
    fileData = request.form.to_dict()
    requiredFields = ['fileType', 'recipeID']
    dp = None

    for field in requiredFields:
        if field not in fileData:
            abort(400, description=f"Missing required field: {field}")

    recipe = storage.get(Recipe, fileData['recipeID'])

    if not recipe:
        abort(404, description="Recipe not found!")

    try:
        if fileData['fileType'] == 'link':
            if 'filePath' not in fileData:
                abort(400, description="Missing required field: filePath")

            for dp in recipe.dps:
                if dp.filePath == fileData['filePath']:
                    abort(409, description="This dp already exist")

            dp = RecipeDP(
                filePath=fileData['filePath'], recipeID=fileData['recipeID'], userID=g.currentUser.id)
            dp.save()
        else:
            DP_FOLDER = f'{current_app.config["DP_FOLDER"]}/recipes/{fileData["recipeID"]}'

            if 'file' not in request.files:
                abort(400, description="File is missing")

            filename = Utils.uploadFile(
                request, DP_FOLDER, ALLOWED_EXTENSIONS, fileData['recipeID'])

            for dp in recipe.dps:
                if dp.filePath == filename:
                    abort(409, description="This dp already exist")

            dp = RecipeDP(filePath=filename,
                          recipeID=fileData['recipeID'], fileType="file", userID=g.currentUser.id)
            dp.save()
    except ValueError as ve:
        return jsonify({
            "status": "error",
            "message": str(ve),
            "data": None
        }), 400
    except IntegrityError as ie:
        return jsonify({
            "status": "error",
            "message": Utils.extractErrorMessage(str(ie)),
            "data": None
        }), 400

    return jsonify({
        "status": "success",
        "message": "Recipe image uploaded successfully!",
        "data": dp.toDict()
    }), 201


@app_views.route('/recipes/dps/<dpID>', methods=['GET'])
# @swag_from(f'{DOCS_DIR}/post_users.yml')
def getDP(dpID):
    """Retrieves a dp file based on ID"""
    response = None

    try:
        dp = storage.get(RecipeDP, dpID)
        if not dp:
            abort(404, description="DP not found!")

        if dp.fileType != 'file':
            abort(406, description="Only dps with fileType: file is acceptable!")

        DP_FOLDER = f'{current_app.config["DP_FOLDER"]}/recipes/{dp.recipeID}'
        response = make_response(send_from_directory(DP_FOLDER, dp.filePath))
    except ValueError as ve:
        return jsonify({
            "status": "error",
            "message": str(ve),
            "data": None
        }), 400
    except IntegrityError as ie:
        return jsonify({
            "status": "error",
            "message": Utils.extractErrorMessage(str(ie)),
            "data": None
        }), 400

    return response

@app_views.route('/recipes/dps', methods=['GET'])
# @swag_from(f'{DOCS_DIR}/post_users.yml')
def getrecipeDPs():
    """Retrieves a dps objects asociated with the recipeID"""
    requiredFields = ['recipeID']
    data = Utils.getReqJSON(request, requiredFields)
    
    dps = storage.getByItemID(RecipeDP, "recipeID", data['recipeID'])
    
    return jsonify({
        "status": "success",
        "message": "Recipe dps retrieved successfully!",
        "data": [dp.toDict() for dp in dps]
    }), 200

@app_views.route('/recipes/dps/<dpID>', methods=['DELETE'])
# @swag_from(f'{DOCS_DIR}/post_users.yml')
@login_required()
def deleteDP(dpID):
    """Deletes a dp file based on ID"""
    privilegedRoles = [UserRole.admin, UserRole.moderator]
    response = None

    try:
        dp = storage.get(RecipeDP, dpID)
        if not dp:
            abort(404, description="DP not found!")

        if dp.userID != g.currentUser.id and g.currentUser.role not in privilegedRoles:
            abort(401, description="You are not authorized to delete this image!")

        if dp.fileType == 'file':
            DP_FOLDER = f'{current_app.config["DP_FOLDER"]}/recipes/{dp.recipeID}'
            Utils.deleteFile(f'{DP_FOLDER}/{dp.filePath}')

        storage.delete(dp)
    except ValueError as ve:
        return jsonify({
            "status": "error",
            "message": str(ve),
            "data": None
        }), 400
    except IntegrityError as ie:
        return jsonify({
            "status": "error",
            "message": Utils.extractErrorMessage(str(ie)),
            "data": None
        }), 400

    return jsonify({
        "status": "success",
        "message": "DP deleted successfully!",
        "data": None
    }), 204
