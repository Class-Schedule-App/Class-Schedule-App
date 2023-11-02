import secrets
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_marshmallow import Marshmallow
from flask_mail import Mail

db = SQLAlchemy()
migrate = Migrate()  # Initialize Flask-Migrate for database migrations
secret_key = secrets.token_hex(64) # Generate a secret key for JWT
ma = Marshmallow()
mail = Mail()
