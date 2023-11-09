from sqlalchemy import DateTime
from .Config import db
from .Student_Session import student_session_association
from .Comment import Comment

class Session(db.Model):
    __tablename__ = 'sessions'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200))
    announcements = db.Column(db.String)
    invite_link = db.Column(db.String)  # New column for invite link
    location = db.Column(db.String)
    created_at = db.Column(DateTime, server_default=db.func.now())
    updated_at = db.Column(
        DateTime, server_default=db.func.now(), onupdate=db.func.now())
    
    attendees = db.relationship('Student', secondary=student_session_association, back_populates='following')
    

    # One-to-Many relationship
    module_id = db.Column(db.Integer, db.ForeignKey(
        'modules.id', name='fk_module_id'))
    comments = db.relationship('Comment', backref='session')
    # Many-to-Many relationship
    followers = db.relationship(
        'Student', secondary=student_session_association, back_populates='following', overlaps="attendees")

    def __init__(self, name, announcements, location, invite_link):
        self.name = name
        self.announcements = announcements
        self.invite_link = invite_link
        self.location = location
        

    def __repr__(self):
        return f"<Session(session_id={self.session_id}, name='{self.name}')>"
