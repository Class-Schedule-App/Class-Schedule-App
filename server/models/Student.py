from datetime import datetime
from sqlalchemy import DateTime
from .Config import db
from .Student_Session import student_session_association
from .Module import Module

class Student(db.Model):
    __tablename__ = 'students'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    email = db.Column(db.String)
    phone_number = db.Column(db.String(20))
    profile_img = db.Column(db.String)  # Assuming it's a db.String representing the image file path
    created_at = db.Column(DateTime, default=datetime.utcnow)
    # One-to-One relationship    # Child Class
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', name='fk_student_id'))
    user = db.relationship('User', back_populates='student', uselist=False)  # One-to-One relationship

    

    # One-to-Many relationship
    modules = db.relationship('Module', backref='student')
    tm_id = db.Column(db.Integer, db.ForeignKey('technical_mentors.id', name='fk_tm_id'))
    comments = db.relationship('Comment', backref='student')
    # Many-to-Many relationship
    following = db.relationship('Session', secondary=student_session_association, back_populates='followers') 

    def __init__(self, name, email, phone_number=phone_number):
        self.name = name
        self.email = email
        self.phone_number = phone_number
