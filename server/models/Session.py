from sqlalchemy import DateTime
from .Config import db
from .Student_Session import student_session_association
from .Comment import Comment

class Session(db.Model):
    __tablename__ = 'sessions'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200))
    announcements = db.Column(db.String)
    invite_link = db.Column(db.String)
    location = db.Column(db.String)
    date = db.Column(db.DateTime)
    start_time = db.Column(db.String)
    end_time = db.Column(db.String)
    created_at = db.Column(DateTime, server_default=db.func.now())
    updated_at = db.Column(DateTime, server_default=db.func.now(), onupdate=db.func.now())

    # One-to-Many relationship
    comments = db.relationship('Comment', backref='session')  
    module_id = db.Column(db.Integer, db.ForeignKey('modules.id', name='fk_module_id'))
    # Many-to-Many relationship
    followers = db.relationship('Student', secondary=student_session_association, back_populates='following')  

    def __repr__(self):
        return f"<Session(session_id={self.session_id}, name='{self.name}')>"