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

    def __init__(self, name, announcements):
        self.name = name
        self.announcements = announcements

    def __repr__(self):
        return f"<Session(session_id={self.session_id}, name='{self.name}')>"