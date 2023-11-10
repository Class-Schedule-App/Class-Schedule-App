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
        sessions_schema = SessionSchema()
        validated_data = sessions_schema.load(request.json)
        try:
            new_session = Session( **validated_data )
            db.session.add(new_session)
            db.session.commit()
            return {"Message": "Session created successfully"}, 201

        except ValidationError as e:
            return (e.messages, 400)

class SessionsId(Resource):
    # @jwt_required()
    def get(self, id):
        sessionx = Session.query.get(id)
        if sessionx:
            schema = SessionSchema()
            return schema.dump(sessionx)
        else:
            return {'message': 'Module not found'}, 404

    def patch(self, id):
        try:
            schema = SessionSchema(partial=True)
            sessionX = Session.query.get_or_404(id)
            session_data = schema.load(request.json)  # Load the request data

            for key, value in session_data.items():
                setattr(sessionX, key, value)  # Update the sessionX instance attributes

            db.session.commit()

            return {"msg": "Session updated", "user": schema.dump(sessionX)}
        except ValidationError as e:
            return handle_marshmallow_error(e), 400

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
    return (e.messages, 400)