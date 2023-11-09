from .Config import db

class Announcement(db.Model):
    __tablename__ = 'announcements'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200))
    announcements = db.Column(db.String)