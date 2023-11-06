from sqlalchemy import DateTime
from .Config import db
from .Modules_TechnicalMentors import ModuleTechnicalMentorAssociation

class TechnicalMentor(db.Model):
    __tablename__ = 'technical_mentors'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    email = db.Column(db.String)
    phone_number = db.Column(db.String(20))
    profile_img = db.Column(db.String)  # Assuming it's a db.String representing the image file path
    created_at = db.Column(DateTime, server_default=db.func.now())
    # One-to-One relationship
    tm_id = db.Column(db.Integer, db.ForeignKey('users.id', name='fk_tm_id'))

    # One-to-Many relationship
    students = db.relationship('Student', backref='technical_mentor')
    # Many-to-Many relationship
    # modules_associated = db.relationship('Module', secondary=ModuleTechnicalMentorAssociation, back_populates='technical_mentors_associated')

    def __init__(self, name, email, phone_number):
        self.name = name
        self.email = email
        self.phone_number = phone_number

    def __repr__(self):
        return f"<TechnicalMentors(tm_id={self.tm_id}, name='{self.name}')>"
    def to_dict(self):
        return {
            'mentor_id': self.id,
            'name': self.name,
            'email': self.email,
            'profile_img': self.profile_img,
            # Add other fields as needed
        }