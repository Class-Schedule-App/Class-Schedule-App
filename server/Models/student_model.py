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
    
    comments = db.relationship('Comment', back_populates='student', lazy='dynamic')  # One-to-Many relationship
    sessions = db.relationship('Session', secondary='session_student_association', back_populates='students')  # Many-to-Many relationship

    
    def to_dict(self):
        return {
            "student_id": self.student_id,
            "name": self.name,
            "email": self.email,
            "profile_img": self.profile_img,
            "created_at": self.created_at
        }
