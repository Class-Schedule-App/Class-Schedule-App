import os
from flask_bcrypt import Bcrypt
from models import db
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask import Flask, jsonify, make_response, request
from dotenv import load_dotenv

load_dotenv()

import cloudinary
from cloudinary.uploader import upload
from cloudinary.utils import cloudinary_url
import cloudinary.api


app = Flask(__name__)
api = Api(app)
bcrypt = Bcrypt(app)
cors = CORS(app)
migrate = Migrate(app, db)
db.init_app(app)

app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DATABASE_URL")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JSONIFY_PRETTYPRINT_REGULAR"] = True

cloudinary.config(
    cloud_name=os.environ.get("CLOUDINARY_CLOUD_NAME"),
    api_key=os.environ.get("CLOUDINARY_API_KEY"),
    api_secret=os.environ.get("CLOUDINARY_API_SECRET"),
)

@app.route('/')
def home():
    return "Welcome to our Class Schedule API"

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)
