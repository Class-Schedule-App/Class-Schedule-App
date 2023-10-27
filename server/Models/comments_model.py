from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import DateTime
from config import db

class Comments(db.Model, SerializerMixin):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.String)
    created_at = db.Column(DateTime, server_default=db.func.now())
    updated_at = db.Column(DateTime, server_default=db.func.now(), onupdate=db.func.now())

    student_id = db.Column(db.Integer, db.ForeignKey('students.student_id'))
    technical_mentor_id = db.Column(db.Integer, db.ForeignKey('technical_mentors.tm_id'))
    session_id = db.Column(db.Integer, db.ForeignKey('sessions.session_id'))
    
    def to_dict(self):
        return {
            "id": self.id,
            "comment": self.comment,
        }
        
    def __repr__(self):
        return f"<Comments(id={self.id}, comment='{self.comment}')>"
    
    