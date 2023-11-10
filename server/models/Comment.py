from sqlalchemy import DateTime
from .Config import db

class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.String)
    likes = db.Column(db.Integer)
    created_at = db.Column(DateTime, server_default=db.func.now())
    updated_at = db.Column(DateTime, server_default=db.func.now(), onupdate=db.func.now())

    # One-to-Many relationship
    student_id = db.Column(db.Integer, db.ForeignKey('students.id', name='fk_student_id'))
    session_id = db.Column(db.Integer, db.ForeignKey('sessions.id', name='fk_session_id'))
        
    def __repr__(self):
        return f"<Comments(id={self.id}, comment='{self.comment}')>"
    