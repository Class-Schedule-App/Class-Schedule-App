from flask_restful import Resource, Api
from flask import Blueprint, jsonify
from marshmallow import ValidationError

# from flask_jwt_extended import jwt_required
from ..models.User import User
from ..models.MarshmallowSchemas.UserSchema import UserSchema

user_blue = Blueprint('user', __name__)
api = Api(user_blue)

class UserResource(Resource):
    # @jwt_required()
    def get(self):
        users = User.query.all()
        user_schema = UserSchema(many=True)
        # Serialize the user list to a JSON string
        json_string = user_schema.dump(users)

        # Return the JSON string directly
        return {"results": json_string}
        
api.add_resource(UserResource, '/users')

@user_blue.errorhandler(ValidationError)
def handle_marshmallow_error(e):
    return jsonify(e.messages), 400