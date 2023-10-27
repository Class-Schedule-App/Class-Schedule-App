from flask import request
from flask_restful import Resource

# Sample data 
comments = {
    1: {
        'comment_id': 1,
        'session_id': 1,
        'user_id': 1,
        'text': 'Great session!',
    },
    2: {
        'comment_id': 2,
        'session_id': 1,
        'user_id': 2,
        'text': 'I learned a lot.',
    },
}

class CommentListResource(Resource):
    def get(self, session_id): 
        session_comments = {comment_id: comment for comment_id, comment in comments.items() if comment['session_id'] == session_id}
        return session_comments

    def post(self, session_id):
        comment_id = max(comments.keys()) + 1
        comment_data = request.get_json()
        comment_data['comment_id'] = comment_id
        comment_data['session_id'] = session_id
        comments[comment_id] = comment_data
        return comment_data, 201
