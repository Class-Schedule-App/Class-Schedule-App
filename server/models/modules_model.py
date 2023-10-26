from sqlalchemy_serializer import SerializerMixin
from config import db

class ModulesForm(db.Model, SerializerMixin):
    __tablename__ = 'modules'

    id = db.Column(db.Integer, primary_key=True)
    module_name = db.Column(db.String)
    date = db.Column(db.String)
    time = db.Column(db.String)
    invite_link = db.Column(db.String)

    def __init__(self, module_name, date, time, invite_link):
        self.module_name = module_name
        self.date = date
        self.time = time
        self.invite_link = invite_link
    def __repr__(self):
        return f"<Module(id={self.id}, module_name='{self.module_name}')>"