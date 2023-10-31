import unittest
from models import db, Comment,Module,Modules_TechnicalMentors,Session,Student,Technical_mentor

class TestModels(unittest.TestCase):

    def setUp(self):
        self.app = create_your_flask_app()
        self.app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'  # Use an in-memory SQLite database for testing
        self.app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
        self.db = db
        self.db.init_app(self.app)
        self.client = self.app.test_client()
        with self.app.app_context():
            self.db.create_all()

    def tearDown(self):
        with self.app.app_context():
            self.db.session.remove()
            self.db.drop_all()

    def test_comment_model(self):
        comment = Comment(comment="Test Comment")
        with self.app.app_context():
            self.db.session.add(comment)
            self.db.session.commit()
            self.assertEqual(Comment.query.count(), 1)
            self.assertEqual(comment.comment, "Test Comment")

    def test_module_model(self):
        module = Module(module_name="Test Module", date="2023-01-01", time="12:00 PM", invite_link="test-link")
        with self.app.app_context():
            self.db.session.add(module)
            self.db.session.commit()
            self.assertEqual(Module.query.count(), 1)
            self.assertEqual(module.module_name, "Test Module")

    def test_session_model(self):
        session = Session(name="Test Session", announcements="Test Announcements")
        with self.app.app_context():
            self.db.session.add(session)
            self.db.session.commit()
            self.assertEqual(Session.query.count(), 1)
            self.assertEqual(session.name, "Test Session")

    def test_module_technical_mentor_association(self):
        # Add test data to ModuleTechnicalMentorAssociation
        with self.app.app_context():
            module = Module(module_name="Test Module", date="2023-01-01", time="12:00 PM", invite_link="test-link")
            tm = TechnicalMentor(name="Test Mentor")
            self.db.session.add(module)
            self.db.session.add(tm)
            self.db.session.commit()
            module.technical_mentors_associated.append(tm)
            self.db.session.commit()
            self.assertEqual(len(module.technical_mentors_associated), 1)

    def test_student_session_association(self):
        # Add test data to student_session_association
        with self.app.app_context():
            student = Student(name="Test Student")
            session = Session(name="Test Session", announcements="Test Announcements")
            self.db.session.add(student)
            self.db.session.add(session)
            self.db.session.commit()
            student.following.append(session)
            self.db.session.commit()
            self.assertEqual(len(student.following), 1)

if __name__ == '__main__':
    unittest.main()
