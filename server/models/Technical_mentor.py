from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import DateTime
from models.Config import db
from .Modules_TechnicalMentors import ModuleTechnicalMentorAssociation

class TechnicalMentor(db.Model, SerializerMixin):
    __tablename__ = 'technical_mentors'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    email = db.Column(db.String)
    profile_img = db.Column(db.String)  # Assuming it's a db.String representing the image file path
    created_at = db.Column(DateTime, server_default=db.func.now())
    # One-to-One relationship
    tm_id = db.Column(db.Integer, db.ForeignKey('users.id', name='fk_tm_id'))
    # One-to-Many relationship
    students = db.relationship('Student', backref='technical_mentor')
    # Many-to-Many relationship
    modules_associated = db.relationship('Module', secondary=ModuleTechnicalMentorAssociation, back_populates='technical_mentors_associated')

    def __init__(self, name, email, profile_img):
        self.name = name
        self.email = email
        self.profile_img = profile_img

    def __repr__(self):
        return f"<TechnicalMentors(tm_id={self.tm_id}, name='{self.name}')>"