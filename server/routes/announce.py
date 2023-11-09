from flask import Blueprint, jsonify, request
from flask_restful import Resource, Api
from ..models.MarshmallowSchemas.AnnouncementSchema import AnnouncementSchema
from ..models.Announcement import Announcement
from ..models.Config import db
from marshmallow import ValidationError

announce = Blueprint('announce', __name__)
api = Api(announce)

class AnnouncementsResource(Resource):
    def get(self):
        schema = AnnouncementSchema(many=True)
        announcements = Announcement.query.all()
        result = schema.dump(announcements)
        return jsonify(result)

    def post(self):
        schema = AnnouncementSchema()
        validated_data = schema.load(request.json)
        try:
            new_announcement = Announcement(**validated_data)
            db.session.add(new_announcement)
            db.session.commit()
            return {"message":"Announcement created successfully"}, 201
        except ValidationError as e:
            return (e.messages, 400)
        
class AnnouncementId(Resource):
    def get(self, id):
        announcement = Announcement.query.get_or_404(id)
        schema = AnnouncementSchema()
        result = schema.dump(announcement)
        return jsonify(result)

    def put(self, id):
        announcement = Announcement.query.get_or_404(id)
        data = request.get_json()
        schema = AnnouncementSchema()
        updated_announcement = schema.load(data, instance=announcement)
        db.session.commit()
        return jsonify(message="Announcement updated successfully")

    def delete(self, id):
        announcement = Announcement.query.get_or_404(id)
        db.session.delete(announcement)
        db.session.commit()
        return jsonify(message="Announcement deleted successfully")

api.add_resource(AnnouncementsResource, '/announce')
api.add_resource(AnnouncementId, '/announce/<int:id>')

@announce.errorhandler(ValidationError)
def handle_marshmallow_error(e):
    return (e.messages), 400