from flask_restful import Resource, Api
from flask import Blueprint
# from flask_jwt_extended import jwt_required
from ..models.User import User
from ..models.MarshmallowSchemas.UserSchema import UserSchema

user_blue = Blueprint('user', __name__)
api = Api(user_blue)

class UserResource(Resource):
    # @jwt_required()
    def get(self):
        users = User.query.all()
        user_list = []

        for user in users:
            user_data = {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "phone_number": user.phone_number,
                "user_type": user.user_type,
                # Add other fields as needed
            }
            user_list.append(user_data)

        user_schema = UserSchema(many=True)
        # Serialize the user list to a JSON string
        json_string = user_schema.dump(user_list)

        # Return the JSON string directly
        return json_string
        
api.add_resource(UserResource, '/users')
