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
    profile_img = db.Column(db.String)  # Assuming it's a db.String representing the image file path
    created_at = db.Column(DateTime, default=datetime.utcnow)
    # One-to-One relationship    # Child Class
    student_id = db.Column(db.Integer, db.ForeignKey('users.id', name='fk_student_id'))


    # One-to-Many relationship
    modules = db.relationship('Module', backref='student')
    tm_id = db.Column(db.Integer, db.ForeignKey('technical_mentors.id', name='fk_tm_id'))
    comments = db.relationship('Comment', backref='student')
    # Many-to-Many relationship
    following = db.relationship('Session', secondary=student_session_association, back_populates='followers') 

    def __init__(self, name, email, profile_img, student_id=student_id):
        self.name = name
        self.email = email
        self.profile_img = profile_img
        self.student_id = student_id
