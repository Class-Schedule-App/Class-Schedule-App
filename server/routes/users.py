from ..models.Config import db
from flask_restful import Resource, Api
from flask import Blueprint, request, jsonify
from ..models.User import User

user_blue = Blueprint('user', __name__)
api = Api(user_blue)

class UserResource(Resource):
    def get(self):
        # Query all users from the database
        users = User.query.all()      
        # Use SerializerMixin to convert the user objects to a dictionary
        user_list = [user.to_dict() for user in users]

        # Return the list of users as JSON response
        return jsonify(users=user_list)
    
    def post(self):
        data = request.get_json()
        user = User(
            username=data['username'],
            email=data['email'],
            phone_number=data['phone_number'],
            user_type=data['user_type'],
            password=data['password']
        )
        db.session.add(user)
        db.session.commit()
        return user.to_dict(), 201

api.add_resource(UserResource, '/users')

