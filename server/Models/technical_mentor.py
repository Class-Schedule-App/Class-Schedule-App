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

    comments = db.relationship('Comment', back_populates='technical_mentor', lazy='dynamic')  # One-to-Many relationship

    def to_dict(self):
        return{
            "tm_id": self.tm_id,
            "name": self.name,
            "email": self.email,
            "profile_img": self.profile_img,
        }

    def __repr__(self):
        return f"<TechnicalMentors(tm_id={self.tm_id}, name='{self.name}')>"