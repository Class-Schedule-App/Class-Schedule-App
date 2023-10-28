from flask import Blueprint, request
from flask_restful import Resource, Api
from models.Config import db
from models.Comment import Comment  # Import your Comment model

comment = Blueprint('comment', __name__)
api = Api(comment)

class CommentListResource(Resource):
    def get(self, session_id):
        # Retrieve comments from the database related to the specified session_id
        session_comments = Comment.query.filter_by(session_id=session_id).all()
        
        # Convert comments to a list of dictionaries
        comments_list = [
            {
                'comment_id': comment.comment_id,
                'text': comment.text,
            }
            for comment in session_comments
        ]
        
        return comments_list

    def post(self, session_id):
        comment_data = request.get_json()
        # Create a new Comment instance and add it to the database
        new_comment = Comment(
            comment=comment,
        )
        db.session.add(new_comment)
        db.session.commit()

        # Return the newly created comment
        return {
            'comment_id': new_comment.comment_id,
            'text': new_comment.text,
            # Add other comment attributes here
        }, 201

api.add_resource(CommentListResource, '/comment')
