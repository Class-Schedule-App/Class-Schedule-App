from flask import Blueprint, request, jsonify
from flask_restful import Api, Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from marshmallow import ValidationError
from ..models.Module import Module, ModuleAttendee
from ..models.Config import db
from ..models.Student import Student 

attendee = Blueprint("attendee", __name__)
api = Api(attendee)

class Attendee(Resource):
    def post(self):
        if request.method == 'POST':
            student_id = request.json.get('id')
            module_id = request.json.get('id')

            # Ensure that both the student and module exist
            student = Student.query.get("id")
            module = Module.query.get("id")

            if student and module:
                # Create a new entry in the module_attendees table
                new_module_attendee = ModuleAttendee(module_id=module_id, student_id=student_id)
                db.session.add(new_module_attendee)
                db.session.commit()

                return ({'message': f'Student {student_id} added to Module {module_id}'}), 200

            return ({'error': 'Student or Module does not exist!'}), 404

        return ({'error': 'Invalid method!'}), 405


@attendee.errorhandler(ValidationError)
def handle_marshmallow_error(e):
    # You need to extract a meaningful message from the ValidationError instance
    messages = getattr(e, 'messages', 'Invalid data')
    return jsonify({'error': messages}), 400

api.add_resource(Attendee, '/add-student-to-module')
