from models.Config import db

# # Define the many-to-many association table between Session and Student
student_session_association= db.Table('Association_Student_Session',
    db.Column('student_id', db.Integer, db.ForeignKey('students.id', name='fk_student_id')),
    db.Column('session_id', db.Integer, db.ForeignKey('sessions.id', name='fk_session_id'))
)
