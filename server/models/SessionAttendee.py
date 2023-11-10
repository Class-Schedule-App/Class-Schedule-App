from .Config import db

class SessionAttendee(db.Model):
    __tablename__ = 'session_attendees'

    module_id = db.Column(db.Integer, db.ForeignKey('sessions.id'), primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'), primary_key=True)

    session_associated_with = db.relationship('Session', backref='module_attendees')
    studentx = db.relationship('Student', backref='module_attendees')