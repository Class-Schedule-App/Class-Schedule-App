from flask import Blueprint, request, jsonify
from flask_restful import Resource, Api
from flask_jwt_extended import jwt_required
from ..models.Config import db
from ..models.Comment import Comment 
from ..models.MarshmallowSchemas.CommentSchema import CommentSchema
from marshmallow import ValidationError

comment = Blueprint('comment', __name__)
api = Api(comment)

class StudentComment(Resource):
    # @jwt_required()
    def get(self):
        comments = Comment.query.all()
        schema = CommentSchema(many=True)
        return schema.dump(comments)

    def post(self):        
        schema = CommentSchema()
        validated_data = schema.load(request.json)
        try:
            comm = Comment(**validated_data)
            db.session.add(comm)
            db.session.commit()
            # Return the newly created comment
            return { "message": "Comment added successfully" }, 201
        except ValidationError as e:
            return (e.messages), 400
api.add_resource(StudentComment, '/comments')
