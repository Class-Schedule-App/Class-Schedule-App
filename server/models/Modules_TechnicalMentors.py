from .Config import db

ModuleTechnicalMentorAssociation = db.Table('Association_Module_TechnicalMentor',
    db.Column('module_id', db.Integer, db.ForeignKey('modules.id', name='fk_module_id')),
    db.Column('tm_id', db.Integer, db.ForeignKey('technical_mentors.id', name='fk_tm_id'))
)