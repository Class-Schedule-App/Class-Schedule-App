import json
from flask import Blueprint, request, jsonify
from flask_restful import Api, Resource
import cloudinary
import cloudinary.uploader
# from ..utils import cloudconfig
from ..models.Student import Student
from ..models.Config import db
from ..utils import cloudconfig

cloud = Blueprint("cloud", __name__)


class StudentRoute(Resource):
    def get(self):
        students = Student.query.all()
        student_list = []

        for student in students:
            student_data = {
                'student_id': student.student_id,
                'name': student.name,
                'email': student.email,
                'profile_img': student.profile_img,
                'created_at': student.created_at.strftime('%Y-%m-%d %H:%M:%S') if student.created_at else None
            }
            student_list.append(student_data)

        return jsonify(students=student_list)
    def post(self):
        data = request.get_json()
        name = data['name']
        email =  data['email']
        profile_img =  data['profile_img']
        student_id =  data['student_id']

        # Check if a student with the given email exists
        existing_student = Student.query.filter_by(email=email).first()

        if existing_student:
            return {"Error": "Username or Email Already Exists"}, 401
        else:
            new_student = Student(name=name, email=email, profile_img=profile_img, student_id=student_id)
            db.session.add(new_student)
            db.session.commit()
            return {"Message": "You have been successfully registered!!"}, 201


ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

class Upload(Resource):
    def post(self, id): 
        if id is None:
            return jsonify({'message': 'No ID provided'}), 400

        student = Student.query.get(id)
        if student is None:
            return jsonify({'message': 'Student not found'}), 40
        
        # Check if the 'file' key exists in the request.files
        if 'file' not in request.files:
            return jsonify({'message': 'No file part'}), 400

        file = request.files['file']

        # Check if a file was uploaded
        if file.filename == '':
            return jsonify({'message': 'No image selected for uploading'}), 400
        # Validate the file type
        if not allowed_file(file.filename):
            return jsonify({'message': 'Invalid file type. Supported types are: png, jpg, jpeg, gif'}), 400

        # Upload the image to Cloudinary
        try:
            result = cloudinary.uploader.upload(file)
            image_url = result['secure_url']

            # Retrieve the user
            student = Student.query.get(id)

            # Update the user's profile picture URL
            student.profile_img = image_url

            db.session.commit()
            response_data = {
                'message': 'Profile picture uploaded and updated successfully',
                'url': image_url
            }

            return json.dumps(response_data), 200
        except Exception as e:
            return jsonify({'message': f'Error uploading image: {str(e)}'}), 500
    
api = Api(cloud)
api.add_resource(Upload, '/upload-profile-picture/<int:id>')  # Make sure to specify the type of the ID
api.add_resource(StudentRoute, '/students')
