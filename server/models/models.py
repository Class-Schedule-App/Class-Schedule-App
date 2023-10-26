from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey
from sqlalchemy_serializer import SerializerMixin
from flask_login import UserMixin

db = SQLAlchemy()

class UserType(enumerate):
    student = "student"
    technical_mentor = "technical_mentor"

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer(), primary_key=True)
    username = db.Column(db.String(100))
    email = db.Column(db.String(200))
    phone_number = db.Column(db.Integer(20))
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())
    user_type = db.Column(db.String, enumerate(UserType))

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "phone_number": self.phone_number,
            "user_type": self.user_type,
        }

    def __repr__(self):
        return f"User: {self.id} | {self.name} | {self.email} | {self.phone_number}"
