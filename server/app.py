import os
from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
from dotenv import load_dotenv
import cloudinary
from Models.config import db
from apps.comments import comment
from apps.mentors import mentor
from apps.modules import module
from apps.sessions import session
from apps.student import studentroute
from apps.users import user
from apps.auth import auth


from Models.comments_model import Comment
from Models.technical_mentor import TechnicalMentor
from Models.modules_model import Module
from Models.session_model import Session
from Models.student_model import Student
from Models.users_model import User

# Load environment variables from a .env file
load_dotenv()

# Initialize the Flask app
app = Flask(__name__)

# Initialize Flask extensions
api = Api(app)
bcrypt = Bcrypt(app)
cors = CORS(app)
migrate = Migrate(app, db)

# Configure app settings
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DATABASE_URL")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JSONIFY_PRETTYPRINT_REGULAR"] = True

# Configure Cloudinary
cloudinary.config(
    cloud_name=os.environ.get("CLOUDINARY_CLOUD_NAME"),
    api_key=os.environ.get("CLOUDINARY_API_KEY"),
    api_secret=os.environ.get("CLOUDINARY_API_SECRET"),
)

# Define a simple welcome route
@app.route('/')
def home():
    return "Welcome to our Class Schedule API"


# Register blueprints for different parts of your app
# blueprints = [
#     (mentor, '/mentors'),
#     (comment, '/comments'),
#     (module, '/modules'),
#     (session, '/sessions'),
#     (user, '/users'),
#     (studentroute, '/studentroute')
# ]

# for blueprint, prefix in blueprints:
#     app.register_blueprint(blueprint, url_prefix=prefix)


if __name__ == '__main__':
    app.run(debug=True)
