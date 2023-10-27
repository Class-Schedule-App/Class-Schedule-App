from sqlalchemy_serializer import SerializerMixin
from config import db


class ModulesForm(db.Model, SerializerMixin):
    __tablename__ = 'modules'

    id = db.Column(db.Integer, primary_key=True)
    module_name = db.Column(db.String)
    date = db.Column(db.String)
    time = db.Column(db.String)
    invite_link = db.Column(db.String)

    # One-to-Many relationship
    students = db.relationship('Student', back_populates='module')
# Define the many-to-many association table between Session and Student
    session_student_association = db.Table('session_student_association',
                                           db.Column('session_id', db.Integer, db.ForeignKey(
                                               'sessions.session_id')),
                                           db.Column('student_id', db.Integer, db.ForeignKey('students.student_id')))

    def to_dict(self):
        return {
            "id": self.id,
            "module_name": self.module_name,
            "date": self.date,
            "time": self.time,
            "invite_link": self.invite_link,
        }

    def __repr__(self):
        return f"<Module(id={self.id}, module_name='{self.module_name}')>"
