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
from models.user import User
import re
from flasgger.utils import swag_from
from os import path
from sqlalchemy.exc import IntegrityError

DOCS_DIR = path.dirname(__file__) + '/documentations/recipes'


@app_views.route('/recipes')
@swag_from(f'{DOCS_DIR}/all_recipes.yml')
def allRecipes():
    """Returns all recipes from database"""
    page = request.args.get('page', 1)
    detailed = request.args.get('detailed', False)
    search = " ".join(re.split(r'[-_]', request.args.get('search', '')))
    filterBy = request.args.get('filter_by')
    filterColumns = {}

    if filterBy:
        print(filterBy)
        try:
            filterColumns = Utils.getFilterColumns(filterBy)
        except ValueError as e:
            return jsonify({
                "status": "error",
                "message": str(e)
            }), 400

    data = storage.getPaginatedData(obj=Recipe, page=int(
        page), search=search, filterColumns=filterColumns)

    return jsonify(Utils.successResponse(data, detailed, 'recipes')), 200


@app_views.route('/recipes/users/<userID>')
@swag_from(f'{DOCS_DIR}/get_user_recipe.yml')
def getUserRecipes(userID):
    """Retrieves all recipes created by a particular user based on userID"""
    page = request.args.get('page', 1)
    detailed = request.args.get('detailed', False)
    search = " ".join(re.split(r'[-_]', request.args.get('search', '')))
    filterBy = request.args.get('filter_by')
    filterColumns = {}
    user = storage.get(User, userID)

    if not user:
        return jsonify({
            "status": "error",
            "message": "This user does not exist"
        }), 404

    if filterBy:
        try:
            filterColumns = Utils.getFilterColumns(filterBy)
        except ValueError as e:
            return jsonify({
                "status": "error",
                "message": str(e)
            }), 400

    filterColumns[getattr(Recipe, 'userID')] = [userID]
    data = storage.getPaginatedData(obj=Recipe, page=int(
        page), search=search, filterColumns=filterColumns)

    return jsonify(Utils.successResponse(data, detailed, 'recipes')), 200


@app_views.route('/recipes/me')
@swag_from(f'{DOCS_DIR}/get_my_recipes.yml')
@login_required()
def getCurrUserRecipes():
    """Retrives all recipes created by the current user"""
    page = request.args.get('page', 1)
    detailed = request.args.get('detailed', False)
    search = " ".join(re.split(r'[-_]', request.args.get('search', '')))
    filterBy = request.args.get('filter_by')
    filterColumns = {}

    if filterBy:
        try:
            filterColumns = Utils.getFilterColumns(filterBy)
        except ValueError as e:
            return jsonify({
                "status": "error",
                "message": str(e)
            }), 400

    filterColumns[getattr(Recipe, 'userID')] = [g.currentUser.id]

    data = storage.getPaginatedData(obj=Recipe, page=int(
        page), search=search, filterColumns=filterColumns)

    return jsonify(Utils.successResponse(data, detailed, 'recipes')), 200


@app_views.route('/recipes/<id>')
@swag_from(f'{DOCS_DIR}/get_recipe.yml')
def recipeByID(id):
    """Returns a single recipe based on ID"""
    recipe = storage.get(Recipe, id)
    detailed = request.args.get('detailed', False)

    if not recipe:
        abort(404)

    return {
        "status": "success",
        "message": "Recipe retrieved successfully!",
        "data": recipe.toDict(detailed=detailed)
    }


@app_views.route('/recipes', methods=['POST'])
@swag_from(f'{DOCS_DIR}/post_recipes.yml')
@login_required([UserRole.admin, UserRole.moderator, UserRole.editor, UserRole.contributor])
def createRecipe():
    """Creates a new recipe and stores it in database"""
    requiredFields = ['name', 'cuisine', 'ingredients',
                      'instructions', 'prep_time_minutes', 'cook_time_minutes']
    optionalFields = ['total_time_minutes',
                      'serving_size', 'calories_per_serving']
    
    try:
        reqJSON = Utils.getReqJSON(request, requiredFields)

        recipeData = {key: value for key, value in reqJSON.items(
        ) if key in requiredFields or key in optionalFields}

        recipeData['userID'] = g.currentUser.id
        recipe = Recipe(**recipeData)
        recipe.save()
        dp = RecipeDP(recipeID=recipe.id)
        dp.save()
    except (ValueError) as e:
        return jsonify({
            "status": "error",
            "message": Utils.extractErrorMessage(str(e))
        }), 400

    data = recipe.toDict(detailed=True)
    return jsonify({
        "status": "success",
        "message": "Recipe created successfully",
        "data": data
    })

@app_views.route('/recipes/dp', methods=['PUT'])
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

            dp = RecipeDP(filePath=fileData['filePath'], recipeID=fileData['recipeID'])
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

            dp = RecipeDP(filePath=filename, recipeID=fileData['recipeID'], fileType="file")
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
    }), 200

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


@app_views.route('/recipes/<id>', methods=['PUT'])
@swag_from(f'{DOCS_DIR}/put_recipes.yml')
@login_required()
def updateRecipe(id):
    """Updates the recipe with the id"""
    recipe = storage.get(Recipe, id)
    if not recipe:
        abort(404, description="Recipe not found!")

    nonUpdatables = ['id', 'userID', 'createdAt', 'updatedAt']
    privilegedRoles = [UserRole.admin, UserRole.moderator, UserRole.editor]

    if g.currentUser.id != recipe.userID and g.currentUser.role not in privilegedRoles:
        abort(401, description="You are not authorized to update this recipe")

    try:
        data = Utils.getReqJSON(request)
        for key, value in data.items():
            if key not in nonUpdatables and hasattr(Recipe, key):
                setattr(recipe, key, value)
        recipe.save()
    except (ValueError, Exception) as e:
        return jsonify({
            "status": "error",
            "message": Utils.extractErrorMessage(str(e))
        }), 400

    return jsonify({
        "status": "success",
        "message": "Recipe updated successfully!",
        "data": recipe.toDict(detailed=True)
    })


@app_views.route('/recipes/<id>', methods=['DELETE'])
@swag_from(f'{DOCS_DIR}/delete_recipes.yml')
@login_required()
def deleteRecipe(id):
    """Deletes the recipe with the id"""
    recipe = storage.get(Recipe, id)
    if not recipe:
        abort(404, description="Recipe not found!")

    privilegedRoles = [UserRole.admin, UserRole.moderator]
    if g.currentUser.id != recipe.userID and g.currentUser.role not in privilegedRoles:
        abort(401, description="You are not authorized to delete this recipe!")

    storage.delete(recipe)

    return jsonify({
        "status": "success",
        "message": "Recipe deleted successfully!",
        "data": None
    }), 200
