import enum
from sqlalchemy import DateTime, Enum  # Import Enum from SQLAlchemy
from .Config import db

class UserType(enum.Enum):
    student = "student"
    technical_mentor = "technical_mentor"

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100))
    email = db.Column(db.String(200))
    phone_number = db.Column(db.String(20))
    password = db.Column(db.String())
    created_at = db.Column(DateTime, server_default=db.func.now())
    updated_at = db.Column(DateTime, server_default=db.func.now(), onupdate=db.func.now())
    user_type = db.Column(db.String(200), Enum(UserType), nullable=False)  
    email_confirmed = db.Column(db.Boolean, default=False)
    
    student = db.relationship('Student', back_populates='user', uselist=False)  # One-to-One relationship
    technical_mentor = db.relationship('TechnicalMentor', back_populates='user', uselist=False)  # One-to-One relationship

    # Parent Class: One-to-One relationship
    # student = db.relationship('Student', backref='user', uselist=False) 
    # technical_mentor = db.relationship('TechnicalMentor', backref='user', uselist=False)  

    def __init__(self, username, email, phone_number, user_type, password):
        self.username = username
        self.email = email
        self.phone_number = phone_number
        self.user_type = user_type
        self.password = password
        
    def __repr__(self):
        return f"<Users(id={self.id}, username='{self.username}')>"

    