import datetime
from flask_restful import Api, Resource
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import jwt_required, create_access_token
from flask import Blueprint, request, jsonify, make_response, url_for
from flask_mail import Message
from itsdangerous import URLSafeTimedSerializer, SignatureExpired
from ..models.Config import db, mail
from ..models.User import User

# Blueprint for authentication routes
auth = Blueprint('auth', __name__)
api = Api(auth)
s = URLSafeTimedSerializer('Thisisasecret!')

# Define a simple welcome route
class Home(Resource):
    def get(self):
        return "Welcome to our Class Schedule API"

class SignUp(Resource):
    def post(self):
        data = request.get_json()

        # Checking if required keys are present
        required_keys = ['username', 'email', 'phone_number', 'user_type', 'password']
        if not all(key in data for key in required_keys):
            return jsonify({'error': 'Missing required fields'}), 400
        
        username = data['username']
        email = data['email']
        phone_number = data['phone_number']
        user_type = data.get('user_type', 'student') 
        password = data['password']

        if User.query.filter_by(email=email).first():
            return {"Error": "Email Already Exists"}, 401
        else:
            hashed_password = generate_password_hash(password, method='pbkdf2:sha256:29000')
            new_user = User( username=username, email=email, phone_number=phone_number, user_type=user_type, password=hashed_password )
            db.session.add(new_user)
            db.session.commit()

            # Generate email confirmation token and send confirmation email
            token = s.dumps(email, salt='email-confirmation')
            link = url_for('auth.confirmemail', token=token, _external=True)
            msg = Message(
            subject= 'Confirmation Email.',
            sender='james.mutio@student.moringaschool.com', recipients=[email],
            body = f'Your confirmation link: {link}'
            )
            mail.send(msg)
            return {"Message": "User registered successfully. Confirmation email sent!"}, 201
class ConfirmEmail(Resource):
    def get(self, token):
        try:
            email = s.loads(token, salt='email-confirmation', max_age=3600)
        except SignatureExpired:
            return {'message': 'The token is expired!'}, 400  # Return 400 for expired token
        user = User.query.filter_by(email=email).first()
        if user is None:
            return {'message': 'User not found!'}, 400

        user.email_confirmed = True
        db.session.commit()

        return {'message': 'Email confirmed successfully!'}, 200
class Login(Resource):
    def post(self):
        auth_data = request.get_json()
        email = auth_data['email']
        password = auth_data['password']
       
        if not email or not password:
            return make_response('Invalid email or password', 401)

        user = User.query.filter_by(email=email).first()

        if not user or not check_password_hash(user.password, password):
            return make_response('Invalid email or password', 401)
        if not user.email_confirmed:
            return make_response('Email not confirmed!', 401)

        # token = jwt.encode({'user_id' : user.id, 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=30)}, secret_key)
        token = create_access_token(identity=user.id, expires_delta=datetime.timedelta(hours=1))
        # Serialize the response object to a JSON string
        json_response = {"Message": "Login Successful!!", 'token': token}

        return json_response

class Logout(Resource):
    @jwt_required()
    def delete(self):
        return {"Message": "You have been Logged out Successfully!"}
class ResetPassword(Resource):
    def patch(self):
        data = request.get_json()
        email = data.get('email')
        new_password = data.get('password')

        if email:
            user = User.query.filter_by(email=email).first()
            if user:
                try:
                    hashed_password = generate_password_hash(new_password, method='pbkdf2:sha256:29000')
                    user.password = hashed_password
                    db.session.commit()
                    return {"message": "Password updated successfully"}, 200
                except Exception as e:
                    db.session.rollback()
                    return {"message": "Error updating password", "error": str(e)}, 500
            else:
                return {"message": "User not found"}, 404
        else:
            return {"message": "Email not provided in the request"}, 400

# Define routes and link them to resources
api.add_resource(Home, '/')
api.add_resource(SignUp, '/signup')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(ResetPassword, '/resetpassword')
api.add_resource(ConfirmEmail, '/confirm_email/<token>')
