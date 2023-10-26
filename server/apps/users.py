from models import db, User
from main import app, Resource, api, request


class UserResource(Resource):
    def get(self):
        users = User.query.all()
        user_list = [user.to_dict() for user in users]
        return user_list
    
    def post(self):
        data = request.get_json()
        user = User(
            username=data['email'],
            email=data['email'],
            phone_number=data['phone_number'],
            user_type=data['user_type']
        )
        db.session.add(user)
        db.session.commit()
        return user.to_dict(), 201

