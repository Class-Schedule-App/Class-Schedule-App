from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from server.app import app, db
from models.session_model import Session

# Configuration for your PostgreSQL database
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://username:password@localhost/database_name'
# db = SQLAlchemy(app)

# Define the SQLAlchemy model for the "Session" table
# class Session(db.Model):
#     pass

# Create a route to create a new session using a POST request
@app.route('/sessions', methods=['POST'])
def create_session():
    data = request.get_json()
    new_session = Session(
        name=data['name'],
        announcement=data['announcement']
    )
    db.session.add(new_session)
    db.session.commit()
    return jsonify(message="Session created successfully"), 201

# Create a route to get all sessions using a GET request
@app.route('/sessions', methods=['GET'])
def get_sessions():
    sessions = Session.query.all()
    sessions_list = []

    for session in sessions:
        session_data = {
            'session_id': session.session_id,
            'name': session.name,
            'announcement': session.announcement,
            'created_at': session.created_at.strftime('%Y-%m-%d %H:%M:%S') if session.created_at else None,
            'updated_at': session.updated_at.strftime('%Y-%m-%d %H:%M:%S') if session.updated_at else None
        }
        sessions_list.append(session_data)

    return jsonify(sessions=sessions_list)

# Create a route to get a specific session by ID using a GET request
@app.route('/sessions/<int:session_id>', methods=['GET'])
def get_session(session_id):
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

# Create a route to update a session by ID using a PUT request
@app.route('/sessions/<int:session_id>', methods=['PUT'])
def update_session(session_id):
    session = Session.query.get(session_id)
    if not session:
        return jsonify(message="Session not found"), 404

    data = request.get_json()
    session.name = data['name']
    session.announcement = data['announcement']
    db.session.commit()
    return jsonify(message="Session updated successfully")

# Create a route to delete a session by ID using a DELETE request
@app.route('/sessions/<int:session_id>', methods=['DELETE'])
def delete_session(session_id):
    session = Session.query.get(session_id)
    if not session:
        return jsonify(message="Session not found"), 404

    db.session.delete(session)
    db.session.commit()
    return jsonify(message="Session deleted successfully")

if __name__ == '__main__':
    app.run(debug=True)

