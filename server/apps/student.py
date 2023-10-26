from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
import cloudinary
import os
from cloudinary.uploader import upload
from cloudinary.utils import cloudinary_url

app = Flask(__name__)

# Configuration for your PostgreSQL database
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://username:password@localhost/database_name'
db = SQLAlchemy(app)


class Student(db.Model):
   pass

# Configure Cloudinary with your Cloudinary account details
cloudinary.config(
    cloud_name="dhrrtsbv0",
    api_key=os.getenv("API_KEY"),
    api_secret=os.getenv("API_SECRET")
)

# Create a route to upload an image to Cloudinary and store the URL in the database
@app.route('/upload_image', methods=['POST'])
def upload_image():
    uploaded_image = cloudinary.uploader.upload(
    "student1.jpg",
    folder="",
    resource_type="image")
     

    # Create a new student record with the Cloudinary URL for the profile_img
    new_student = Student(
        name='John Doe',
        email='john.doe@example.com',
        profile_img=uploaded_image['https://res.cloudinary.com/dhrrtsbv0/image/upload/v1698243363/ezeimhfhoxhebikysumo.jpg']
    )

    # Add the new student to the database
    db.session.add(new_student)
    db.session.commit()

    return 'Image uploaded to Cloudinary and student record created.'

# Create a route to fetch data from the database, including Cloudinary image URLs
@app.route('/students', methods=['GET'])
def get_students():
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

if __name__ == '__main__':
    app.run(debug=True)
