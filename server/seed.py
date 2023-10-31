import random
from datetime import datetime
from .app import app  # Import the Flask app
from .models.Config import db
from .models.Student import Student
from .models.Technical_mentor import TechnicalMentor
from .models.User import User
from .models.Module import Module
from .models.Session import Session
from .models.Comment import Comment

def seed_data():
    with app.app_context():
        print("🌱 Seeding data...")

        # Sample data for Users
        users = [
            User(username="Alice", email="alice@example.com", phone_number="0734567890", user_type="student", password=5431),
            User(username="Bob", email="bob@example.com", phone_number="0776543210", user_type="technical_mentor", password=5431),
            # Add more users as needed
        ]
        db.session.add_all(users)
        db.session.commit()

        # Sample data for Students
        students = [
            Student(name="Alice Student", email="alice@student.com", profile_img="alice.jpg", student_id=1),
            # Add more students as needed
        ]
        db.session.add_all(students)
        db.session.commit()

        # Sample data for Technical Mentors
        mentors = [
            TechnicalMentor(name="Bob Mentor", email="bob@mentor.com", profile_img="bob.jpg"),
            # Add more mentors as needed
        ]
        db.session.add_all(mentors)
        db.session.commit()

        # Sample data for Modules
        modules = [
            Module(module_name="Module A", date="2023-10-27", time="10:00 AM", invite_link="link_a"),
            Module(module_name="Module B", date="2023-10-28", time="11:00 AM", invite_link="link_b"),
            # Add more modules as needed
        ]
        db.session.add_all(modules)
        db.session.commit()

        # Sample data for Sessions
        sessions = [
            Session(name="Session 1", announcements="Announcement 1", ),
            Session(name="Session 2", announcements="Announcement 2", ),
            # Add more sessions as needed
        ]
        db.session.add_all(sessions)
        db.session.commit()

        # Sample data for Comments
        # comments = [
        #     Comment(comment="Great session!"),
        #     Comment(comment="Awesome content!"),
        #     # Add more comments as needed
        # ]
        # db.session.add_all(comments)
        # db.session.commit()

        # Additional seeding for many-to-many relationships if applicable
        # e.g., relate Sessions and Students for many-to-many relationship

        print("🌱 Data seeding completed!")

if __name__ == '__main__':
    with app.app_context():
        seed_data()
