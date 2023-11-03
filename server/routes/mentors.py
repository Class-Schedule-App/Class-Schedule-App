from flask import Blueprint, request
from flask_restful import Api, Resource
# from flask_jwt_extended import jwt_required
import cloudinary.uploader
# from ..utils import cloudconfig
from ..models.Technical_mentor import TechnicalMentor
from ..models.Config import db

ment = Blueprint('mentor', __name__)
api = Api(ment)

class TechnicalMentorResource(Resource):
    # @jwt_required()
    def get(self):
        mentors = TechnicalMentor.query.all()
        mentor_list = [mentor.to_dict() for mentor in mentors]
        return mentor_list
    
    def post(self):
        data = request.get_json()
        mentor = TechnicalMentor(
            name=data.get('name'),
            email=data.get('email'),
            profile_img=data.get('profile_img'),
        )
        db.session.add(mentor)
        db.session.commit()
        return mentor.to_dict(), 201
    
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

class Upload(Resource):
    def post(self, id): 
        # Retrieve the tm
        tm = TechnicalMentor.query.get(id)
        if tm is None:
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
            tm.profile_img = image_url

            db.session.commit()
            response_data = {
                'message': 'Profile picture uploaded and updated successfully',
                'url': image_url
            }

            return response_data, 200
        except Exception as e:
            return {'message': f'Error uploading image: {str(e)}'}, 500
    
api.add_resource(Upload, '/upload-mentor-picture/<int:id>')  # Make sure to specify the type of the ID
api.add_resource(TechnicalMentorResource, '/mentors')   