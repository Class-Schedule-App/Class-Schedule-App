from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import DateTime
from config import db

class TechnicalMentor(db.Model, SerializerMixin):
    __tablename__ = 'technical_mentors'

    tm_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    email = db.Column(db.String)
    profile_img = db.Column(db.String)  # Assuming it's a db.String representing the image file path
    created_at = db.Column(DateTime, server_default=db.func.now())

    def __init__(self, name, email, profile_img):
        self.name = name
        self.email = email
        self.profile_img = profile_img

    def __repr__(self):
        return f"<TechnicalMentors(tm_id={self.tm_id}, name='{self.name}')>"