from flask import Blueprint, request
from flask_restful import Api, Resource
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from models.Config import db
from models.User import User
# from app import jwt

# Blueprint for authentication routes
auth = Blueprint('auth', __name__)
api = Api(auth)

# Define a simple welcome route
class Home(Resource):
    def get(self):
        return "Welcome to our Class Schedule API"

class SignUp(Resource):
    def post(self):
        data = request.get_json()
        username = data['username']
        email = data['email']
        phone_number = data['phone_number']
        user_type = data.get('user_type', 'student') 
        password = data['password']  # Default to 'job seeker'

        if User.query.filter_by(username=username).first() or User.query.filter_by(email=email).first():
            return {"Error": "Username or Email Already Exists"}, 401
        else:
            hashed_password = generate_password_hash(password, method='sha256')
            new_user = User(username=username, email=email, phone_number=phone_number, user_type=user_type,password=hashed_password
                            )
            db.session.add(new_user)
            db.session.commit()
            return {"Message": "User registered successfully!!"}, 201

class Login(Resource):
    def post(self):
        data = request.get_json()
        email = data['email']
        password = data['password'] 

        user = User.query.filter_by(email=email).first()
        if user and check_password_hash(user.password, password):
            # Generate the token using the secret key
            expiration_time = 3600  # Example expiration time in seconds
            token = create_access_token({'user_id': user.id}, expires_delta=False)
            return {"Message": "Login Successful!!", "token": token}, 200
        else:
            return {"Error": "Invalid Username or Password!!"}, 401


class Logout(Resource):
    @jwt_required()
    def delete(self):
        return {"Message": "You have been Logged out Successfully!"}
    
# Define routes and link them to resources
api.add_resource(Home, '/')
api.add_resource(SignUp, '/signup')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')