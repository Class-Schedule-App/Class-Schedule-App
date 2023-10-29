import secrets
from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from .models.Config import db, migrate
# Register the blueprints for different routes in your app
from .routes.auth import auth
from .routes.student import cloud
from .routes.comments import comment
from .routes.mentors import ment
from .routes.sessions import session
from .routes.users import user_blue
from .routes.modules import module
from .utils import DATABASE_URL

# Initialize the Flask app
app = Flask(__name__)

# Configure application settings
app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URL
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JSONIFY_PRETTYPRINT_REGULAR"] = True

# Generate a secret key for JWT
secret_key = secrets.token_hex(32)

# Initialize Flask extensions
api = Api(app)  # Initialize the RESTful API
bcrypt = Bcrypt(app)  # Initialize Bcrypt for password hashing
cors = CORS(app)  # Enable Cross-Origin Resource Sharing (CORS)
db.init_app(app)  # Initialize the SQLAlchemy database
migrate.init_app(app, db)

# Initialize JWT with the secret key
app.config['JWT_SECRET_KEY'] = secret_key
jwt = JWTManager(app)


# Register the blueprints for different routes in the app
blueprints = [auth, cloud, comment, ment, session, user_blue, module]

for blueprint in blueprints:
    app.register_blueprint(blueprint)

# Run the application on port 5555 in debug mode
if __name__ == '__main__':
    app.run(port=5555, debug=True)
