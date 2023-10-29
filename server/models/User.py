import enum
from sqlalchemy_serializer import SerializerMixin
<<<<<<<< HEAD:server/Models/users_model.py
from sqlalchemy import DateTime, Enum
from config import db
from enum import Enum as PythonEnum

class UserType(PythonEnum):
========
from sqlalchemy import DateTime, Enum  # Import Enum from SQLAlchemy
from .Config import db

class UserType(enum.Enum):
>>>>>>>> models:server/Models/User.py
    student = "student"
    technical_mentor = "technical_mentor"

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100))
    email = db.Column(db.String(200))
    phone_number = db.Column(db.Integer())
    password = db.Column(db.String(80))
    created_at = db.Column(DateTime, server_default=db.func.now())
    updated_at = db.Column(DateTime, server_default=db.func.now(), onupdate=db.func.now())
<<<<<<<< HEAD:server/Models/users_model.py
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
========
    user_type = db.Column(db.String(200), Enum(UserType), nullable=False)  

    # Parent Class: One-to-One relationship
    student = db.relationship('Student', backref='user', uselist=False) 
    technical_mentor = db.relationship('TechnicalMentor', backref='user', uselist=False) 

    def __init__(self, username, email, phone_number, user_type, password):
        self.username = username
        self.email = email
        self.phone_number = phone_number
        self.user_type = user_type
        self.password = password
>>>>>>>> models:server/Models/User.py

    def __repr__(self):
        return f"<Users(id={self.id}, username='{self.username}')>"

    