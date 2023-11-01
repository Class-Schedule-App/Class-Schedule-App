from flask import Blueprint, jsonify, request
from flask_restful import Api, Resource
from ..models.Session import Session
from ..models.Config import db

session = Blueprint('session', __name__)
api = Api(session)

class Sessions(Resource):
    def get(self):
        sessions = Session.query.all()
        sessions_list = []

        for session in sessions:
            session_data = {
                'session_id': session.id,
                'name': session.name,
                'announcements': session.announcements,
                'created_at': session.created_at.strftime('%Y-%m-%d %H:%M:%S') if session.created_at else None,
                'updated_at': session.updated_at.strftime('%Y-%m-%d %H:%M:%S') if session.updated_at else None
            }
            sessions_list.append(session_data)

        return jsonify(sessions=sessions_list)

    def post(self):
        data = request.get_json()
        new_session = Session(
            name=data.get('name'),  # Use .get() to avoid KeyError if the key is missing
            announcements=data.get('announcements')  # Use .get() to avoid KeyError if the key is missing
        )
        db.session.add(new_session)
        db.session.commit()
        return jsonify(message="Session created successfully"), 201

class SessionsId(Resource):
    def get(self, session_id):
        session = Session.query.get(session_id)
        if session:
            session_data = {
                'session_id': session.session_id,
                'name': session.name,
                'announcement': session.announcement,
                'created_at': session.created_at.strftime('%Y-%m-%d %H:%M:%S') if session.created_at else None,
                'updated_at': session.updated_at.strftime('%Y-%m-%d %H:%M:%S') if session.updated_at else None
            }
            return jsonify(session_data)
        else:
            return jsonify(message="Session not found"), 404

    def put(self, session_id):
        session = Session.query.get(session_id)
        if not session:
            return jsonify(message="Session not found"), 404

        data = request.get_json()
        session.name = data['name']
        session.announcement = data['announcement']
        db.session.commit()
        return jsonify(message="Session updated successfully")

# Create a route to delete a session by ID using a DELETE request
    def delete(self, session_id):
        session = Session.query.get(session_id)
        if not session:
            return jsonify(message="Session not found"), 404

        db.session.delete(session)
        db.session.commit()
        return jsonify(message="Session deleted successfully")

api.add_resource(Sessions, '/sessions')
api.add_resource(SessionsId, '/sessions/<int:session_id>')
