from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import DateTime
from config import db

class Session(db.Model, SerializerMixin):
    __tablename__ = 'session'

    session_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200))
    announcements = db.Column(db.String)
    created_at = db.Column(DateTime, server_default=db.func.now())
    updated_at = db.Column(DateTime, server_default=db.func.now(), onupdate=db.func.now())

    comments = db.relationship('Comment', back_populates='session', lazy='dynamic')  # One-to-Many relationship
    students = db.relationship('Student', secondary=session_student_association, back_populates='sessions')  # Many-to-Many relationship

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "announcements": self.announcements,
        }

    def __repr__(self):
        return f"<Session(session_id={self.session_id}, name='{self.name}')>"