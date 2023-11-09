from flask import Blueprint, request, jsonify
from flask_restful import Api, Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from marshmallow import ValidationError
from ..models.Session import Session
from ..models.Config import db
from ..models.Student import Student 
from ..models.SessionAttendee import SessionAttendee

attendee = Blueprint("attendee", __name__)
api = Api(attendee)

class Attendee(Resource):
    def get(self):
        # Perform the logic for getting attendees here
        attendees = SessionAttendee.query.all()
        attendee_data = [
            {
                "student_id": attendee.student_id,
                "module_id": attendee.module_id
            }
            for attendee in attendees
        ]
        return attendee_data, 200
    def post(self):
        if request.method == 'POST':
            data = request.get_json()

            student_id = data.get('student_id')
            module_id = data.get('module_id')

            student = Student.query.get(student_id)
            session = Session.query.get(module_id)

            if student and session:
                new_session = SessionAttendee(
                    student_id=student_id,
                    module_id=module_id
                )
                db.session.add(new_session)
                db.session.commit()
                return {"message": f"Student {student_id} added to Module {module_id}"}, 200
            else:
                return {"error": "Student or Module does not exist!"}, 404

        return {"error": "Invalid method!"}, 405

@attendee.errorhandler(ValidationError)
def handle_marshmallow_error(e):
    # You need to extract a meaningful message from the ValidationError instance
    messages = getattr(e, 'messages', 'Invalid data')
    return jsonify({'error': messages}), 400

api.add_resource(Attendee, '/add-student-to-module')
