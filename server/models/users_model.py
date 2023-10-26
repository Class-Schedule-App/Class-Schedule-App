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

    def __init__(self, username, email, phone_number, user_type):
        self.username = username
        self.email = email
        self.phone_number = phone_number
        self.user_type.value = user_type

    def __repr__(self):
        return f"<Users(id={self.id}, username='{self.username}')>"
