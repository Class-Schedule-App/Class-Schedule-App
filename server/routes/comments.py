from flask import Blueprint, request, jsonify
from flask_restful import Resource, Api
from flask_jwt_extended import jwt_required
from ..models.Config import db
from ..models.Comment import Comment 

comment = Blueprint('comment', __name__)
api = Api(comment)

class StudentComment(Resource):
    # @jwt_required()
    def get(self):
        comments = Comment.query.all()
        comment_list = []
        
        for comm in comments:
            comment_data ={
                'comment_id': comm.id,
                'comment': comm.comment,
            }
            comment_list.append(comment_data)
        return jsonify(comment_list)

    def post(self):        
        commentjson = request.get_json()
        # Check if 'comment' key exists in the JSON
        if 'comment' not in commentjson:
            return { "message": "Comment data is missing" }, 400       
        new_comment = Comment(
            comment=commentjson['comment']
        )
        db.session.add(new_comment)
        db.session.commit()

        # Return the newly created comment
        return { "message": "Comment added successfully" }, 201

api.add_resource(StudentComment, '/comments')
