import os
from dotenv import load_dotenv
import cloudinary.uploader
from flask import Blueprint, request, jsonify
from flask_restful import Api, Resource
# from flask_jwt_extended import jwt_required
from marshmallow import ValidationError
from ..models.Student import Student
from ..models.Config import db
from ..models.MarshmallowSchemas.StudentSchema import StudentSchema

dotenv_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env.cloudinary')
loaded = load_dotenv(dotenv_path)
print(f"Dotenv Loaded: {loaded}")

# Access Cloudinary credentials
cloudinary_api_key = os.getenv("CLOUDINARY_API_KEY")
cloudinary_api_secret = os.getenv("CLOUDINARY_API_SECRET")
cloudinary_cloud_name = os.getenv("CLOUDINARY_CLOUD_NAME")
# Configure Cloudinary
cloudinary.config(
    cloud_name=cloudinary_cloud_name,
    api_key=cloudinary_api_key,
    api_secret=cloudinary_api_secret
)

cloud = Blueprint("cloud", __name__)

api = Api(cloud)



ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

class StudentRoute(Resource):
    # @jwt_required
    def get(self):
        students = Student.query.all()
        schema = StudentSchema(many=True)
        return schema.dump(students)

    def post(self):
        schema = StudentSchema()
        validated_data = schema.load(request.json)
        # Upload the image to Cloudinary
        # image_url = Upload().post()
        # # Check if the image URL is None
        # if not image_url:
        #     return {'message': 'No file part'}, 400
        # validated_data['profile_img'] = image_url
        try:            
            new_student = Student(**validated_data)
            db.session.add(new_student)
            db.session.commit()
            return {"Message": "You have been successfully registered!!"}, 201
        except ValidationError as e:
            return (e.messages), 400

class Upload(Resource):
    def post(self, id): 
        # Retrieve the user
        student = Student.query.get(id)
        if student is None:
            return {'message': 'Student not found'}, 40
        
        # Check if the 'file' key exists in the request.files
        if 'file' not in request.files:
            return {'message': 'No file part'}, 400

        file = request.files['file']
        
        # Validate the file type
        if not allowed_file(file.filename):
            return {'message': 'Invalid file type. Supported types are: png, jpg, jpeg, gif'}, 400

        # Upload the image to Cloudinary
        try:
            result = cloudinary.uploader.upload(file)
            image_url = result['secure_url']

            # Update the user's profile picture URL
            student.profile_img = image_url

            db.session.commit()
            response_data = {
                'message': 'Profile picture uploaded and updated successfully',
                'image_url': image_url
            }

            return response_data, 201
        except Exception as e:
            return {'message': f'Error uploading image: {str(e)}'}, 500
    
api.add_resource(Upload, '/upload-profile-picture/<int:id>')  # Make sure to specify the type of the ID
api.add_resource(StudentRoute, '/students')
