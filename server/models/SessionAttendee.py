from .Config import db

class ModuleAttendee(db.Model):
    __tablename__ = 'session_attendees'

    session_id = db.Column(db.Integer, db.ForeignKey('sessions.id'), primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'), primary_key=True)

    session_associated_with = db.relationship('Session', backref='session_attendees')
    studentx = db.relationship('Student', backref='module_attendees')