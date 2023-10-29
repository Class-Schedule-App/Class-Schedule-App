from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import DateTime
from .Config import db
from .Student_Session import student_session_association

class Session(db.Model, SerializerMixin):
    __tablename__ = 'sessions'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200))
    announcements = db.Column(db.String)
    created_at = db.Column(DateTime, server_default=db.func.now())
    updated_at = db.Column(DateTime, server_default=db.func.now(), onupdate=db.func.now())

    # One-to-Many relationship
    module_id = db.Column(db.Integer, db.ForeignKey('modules.id', name='fk_module_id'))
    comments = db.relationship('Comment', backref='session')  
    # Many-to-Many relationship
    followers = db.relationship('Student', secondary=student_session_association, back_populates='following')  


    def __init__(self, name, announcements):
        self.name = name
        self.announcements = announcements

    def __repr__(self):
        return f"<Session(session_id={self.session_id}, name='{self.name}')>"