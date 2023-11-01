from .Config import db
from .Modules_TechnicalMentors import ModuleTechnicalMentorAssociation

class Module(db.Model):
    __tablename__ = 'modules'

    id = db.Column(db.Integer, primary_key=True)
    module_name = db.Column(db.String)
    date = db.Column(db.String)
    time = db.Column(db.String)
    invite_link = db.Column(db.String)

    # One-to-Many relationship
    student_id = db.Column(db.Integer, db.ForeignKey('students.id', name='fk_student_id'))
    sessions = db.relationship('Session', backref='module')

    #Many to Many
    technical_mentors_associated = db.relationship('TechnicalMentor', secondary=ModuleTechnicalMentorAssociation, back_populates='modules_associated')

    def __init__(self, module_name, date, time, invite_link):
        self.module_name = module_name
        self.date = date
        self.time = time
        self.invite_link = invite_link
    def __repr__(self):
        return f"<Module(id={self.id}, module_name='{self.module_name}')>"