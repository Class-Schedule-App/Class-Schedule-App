from sqlalchemy_serializer import SerializerMixin
from datetime import datetime
from sqlalchemy import DateTime
from config import db

class Student(db.Model, SerializerMixin):
    __tablename__ = 'students'

    student_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    email = db.Column(db.String)
    profile_img = db.Column(db.String)  # Assuming it's a db.String representing the image file path
    created_at = db.db.Column(DateTime, default=datetime.utcnow)
    
    def __init__(self, student_id, name, email, profile_img, created_at):
        self.student_id = student_id
        self.name = name
        self.email = email
        self.profile_img = profile_img
        self.created_at = created_at