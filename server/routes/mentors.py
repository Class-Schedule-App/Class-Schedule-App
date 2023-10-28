from flask_restful import Api, Resource
from models.Technical_mentor import TechnicalMentor
from models.Config import db
from flask import Blueprint, request

ment = Blueprint('mentor', __name__)
api = Api(ment)

class TechnicalMentorResource(Resource):
    def get(self):
        mentors = TechnicalMentor.query.all()
        mentor_list = [mentor.to_dict() for mentor in mentors]
        return mentor_list
    
    def post(self):
        data = request.get_json()
        mentor = TechnicalMentor(
            name=data.get('name'),
            email=data.get('email'),
            profile_img=data.get('profile_img'),
        )
        db.session.add(mentor)
        db.session.commit()
        return mentor.to_dict(), 201
    
api.add_resource(TechnicalMentorResource, '/mentors')   