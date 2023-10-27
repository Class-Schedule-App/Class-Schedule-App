from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import DateTime, Enum
from config import db
from enum import Enum as PythonEnum

class UserType(PythonEnum):
    student = "student"
    technical_mentor = "technical_mentor"

class Users(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100))
    email = db.Column(db.String(200))
    phone_number = db.Column(db.Integer(20))
    created_at = db.Column(DateTime, server_default=db.func.now())
    updated_at = db.Column(DateTime, server_default=db.func.now(), onupdate=db.func.now())
    user_type = db.Column(Enum(UserType))

    student = db.relationship('Student', back_populates='user', uselist=False)  # One-to-One relationship
    technical_mentor = db.relationship('TechnicalMentor', back_populates='user', uselist=False)  # One-to-One relationship

    def to_dict(self):
        return{
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "phone_number": self.phone_number,
            "user_type": self.user_type.value
        }

    def __repr__(self):
        return f"<Users(id={self.id}, username='{self.username}')>"

    