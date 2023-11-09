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
        attendee_data = SessionAttendee.query.all()

        attendees_info = []
        for attendee in attendee_data:
            student = Student.query.filter_by(id=attendee.student_id).first()
            module = Session.query.filter_by(id=attendee.module_id).first()

            if student and module:
                attendee_info = {
                    "student_name": student.name,
                    "module_name": module.name
                }
                attendees_info.append(attendee_info)

        return attendees_info, 200
    def post(self):
        if request.method == 'POST':
            data = request.get_json()

            student_id = data.get('student_id')
            module_id = data.get('module_id')

             # Check if the record already exists
            existing_attendee = SessionAttendee.query.filter_by(student_id=student_id, module_id=module_id).first()

            if existing_attendee:
                return {"error": "Attendee already exists"}, 409  # HTTP status code 409 for conflict

            # If it doesn't exist, perform the insertion
            new_session = SessionAttendee(
                student_id=student_id,
                module_id=module_id
            )
            db.session.add(new_session)
            db.session.commit()
            return {"message": f"Student {student_id} added to Module {module_id}"}, 200

        return {"error": "Invalid method!"}, 405
class AttendeeStudent(Resource):
    # @jwt_required()
    def get(self, student_id):
        attendee_data = SessionAttendee.query.filter_by(student_id=student_id).all()

        modules_info = []

        for attendee in attendee_data:
            module = Session.query.filter_by(id=attendee.module_id).first()

            if module is not None:
                module_info = {
                    "module_id": module.id,
                    "module_name": module.name
                    # Add more module details if needed
                }
                modules_info.append(module_info)

        return modules_info, 200



@attendee.errorhandler(ValidationError)
def handle_marshmallow_error(e):
    # You need to extract a meaningful message from the ValidationError instance
    messages = getattr(e, 'messages', 'Invalid data')
    return jsonify({'error': messages}), 400

api.add_resource(Attendee, '/add-student-to-module')
api.add_resource(AttendeeStudent, '/attendeestudent/<int:student_id>')
