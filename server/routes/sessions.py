from flask import Blueprint, jsonify, request
from flask_restful import Api, Resource
# from flask_jwt_extended import jwt_required
from ..models.Session import Session
from ..models.Config import db
from ..models.MarshmallowSchemas.SessionSchema import SessionSchema
from marshmallow import ValidationError

session = Blueprint('session', __name__)
api = Api(session)

class Sessions(Resource):
    # @jwt_required()
    def get(self):
        sessions = Session.query.all()
        schema = SessionSchema(many=True)
        return schema.dump(sessions)

    def post(self):
        try:
            sessions_schema = SessionSchema()
            validated_data = sessions_schema.load(request.json)

            new_session = Session( **validated_data )
            db.session.add(new_session)
            db.session.commit()
            return {"Message": "Session created successfully"}, 201

        except ValidationError as e:
            return handle_marshmallow_error(e), 400

class SessionsId(Resource):
    # @jwt_required()
    def get(self, id):
        sessionx = Session.query.get(id)
        if sessionx:
            session_data = {
                'session_id': sessionx.id,  # Correct variable name and attribute access
                'name': sessionx.name,
                'announcements': sessionx.announcements,
            }
            return jsonify(session_data)
        else:
            return {'message': 'Session not found'}, 404

    def put(self, id):
        sessionx = Session.query.get(id)
        if not sessionx:
            return jsonify(message="Session not found"), 404

        data = request.get_json()
        if 'name' in data:
            sessionx.name = data['name']
        if 'announcements' in data:
            sessionx.announcements = data['announcements']

        try:
            db.session.add(sessionx)
            db.session.commit()
            return jsonify(message="Session updated successfully")
        except Exception as e:
            db.session.rollback()
            return jsonify(message=f"Error updating session: {str(e)}"), 500


# Create a route to delete a session by ID using a DELETE request
    def delete(self, id):
        sessionx = Session.query.get(id)
        if not sessionx:
            return jsonify(message="Session not found"), 404
      
        db.session.delete(sessionx)
        db.session.commit()
        return jsonify(message="Session deleted successfully")

api.add_resource(Sessions, '/sessions')
api.add_resource(SessionsId, '/sessions/<int:id>')

@session.errorhandler(ValidationError)
def handle_marshmallow_error(e):
    return (e.messages), 400