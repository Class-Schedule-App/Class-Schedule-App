from server.app import Resource, reqparse, api
from models.technical_mentor import TechnicalMentor
from models.config import db

mentor_parser = reqparse.RequestParser()
mentor_parser.add_argument('username', type=str, required=True, help='Username is required')
mentor_parser.add_argument('email', type=str, required=True, help='Email is required')
mentor_parser.add_argument('phone_number', type=str, required=True, help='Phone number is required')
mentor_parser.add_argument('user_type', type=str, required=True, help='User type is required')

class TechnicalMentorResource(Resource):
    def get(self):
        mentors = TechnicalMentor.query.all()
        mentor_list = [mentor.to_dict() for mentor in mentors]
        return mentor_list
    
    def post(self):
        data = mentor_parser.parse_args()
        mentor = TechnicalMentor(
            username=data['username'],
            email=data['email'],
            phone_number=data['phone_number'],
            user_type=data['user_type']
        )
        db.session.add(mentor)
        db.session.commit()
        return mentor.to_dict(), 201
    
