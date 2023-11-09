import random
from datetime import datetime
from werkzeug.security import generate_password_hash
from .app import app  # Import the Flask app
from .models.Config import db
from .models.Student import Student
from .models.Technical_mentor import TechnicalMentor
from .models.User import User
from .models.Module import Module
from .models.Session import Session
from .models.Comment import Comment
from .models.Announcement import Announcement


def seed_data():
    with app.app_context():
        print("🌱 Seeding data...")

       # Sample data for Users with hashed passwords
        users = [
            User(username="Alice", email="alice@example.com", phone_number="1234567890", user_type="student", password=generate_password_hash("password1")),
            User(username="Bob", email="bob@example.com", phone_number="9876543210", user_type="technical_mentor", password=generate_password_hash("password2")),
            User(username="Charlie", email="charlie@example.com", phone_number="5555555555", user_type="student", password=generate_password_hash("password3")),
            User(username="David", email="david@example.com", phone_number="4444444444", user_type="technical_mentor", password=generate_password_hash("password4")),
        ]
        db.session.add_all(users)
        db.session.commit()


        # Sample data for Students
        students = [
            Student(name="Alice Student", email="alice@student.com", profile_img="alice.jpg", student_id=1),
            Student(name="Bob Student", email="bob@student.com", profile_img="bob.jpg", student_id=2),
            Student(name="Charlie Student", email="charlie@student.com", profile_img="charlie.jpg", student_id=3),
        ]
        db.session.add_all(students)
        db.session.commit()

        # Sample data for Technical Mentors
        mentors = [
            TechnicalMentor(name="Alice Mentor", email="alice@mentor.com", profile_img="alice.jpg"),
            TechnicalMentor(name="Bob Mentor", email="bob@mentor.com", profile_img="bob.jpg"),
            
        ]
        db.session.add_all(mentors)
        db.session.commit()

        # Sample data for Modules
        modules = [
            Module(module_name="Module A", invite_link="link_a"),
            Module(module_name="Module B", invite_link="link_b"),
            Module(module_name="Module C", invite_link="link_c"),
            Module(module_name="Module D", invite_link="link_d"),
            Module(module_name="Module E", invite_link="link_e"),
            Module(module_name="Module F", invite_link="link_f"),
            Module(module_name="Module G", invite_link="link_g"),
            Module(module_name="Module H", invite_link="link_h"),
            Module(module_name="Module I", invite_link="link_i"),
            Module(module_name="Module J", invite_link="link_j"),
        ]

        db.session.add_all(modules)
        db.session.commit()

        print("🌱 Data seeding completed!")
        sessions = [
            Session(name="Session 1", announcements="Announcement 1", module_id=1, start_time="10:00 AM", end_time="12:00 PM", invite_link="https://example.com/session1", location="Webinar",   date="2023-10-27"),
            Session(name="Session 2", announcements="Announcement 2", module_id=2,start_time="1:00 PM", end_time="3:00 PM", invite_link="https://example.com/session2", location="Virtual Classroom",   date="2023-10-27"),
            Session(name="Session 3", announcements="Announcement 3", module_id=3, start_time="2:00 PM", end_time="4:00 PM", invite_link="https://example.com/session3", location="Conference Room B",   date="2023-10-27"),
            Session(name="Session 4", announcements="Announcement 4", module_id=4, start_time="3:00 PM", end_time="5:00 PM", invite_link="https://example.com/session4", location="Training Hall",  date="2023-10-27"),
            Session(name="Session 5", announcements="Announcement 5", module_id=5,start_time="10:00 AM", end_time="12:00 PM", invite_link="https://example.com/session5", location="Meeting Room A",  date="2023-10-27"),
        ]
        db.session.add_all(sessions)
        db.session.commit()  
            
       # Add and commit the updated seed data
        # Sample data for Comments
        comments = [
            Comment(comment="Great session!", likes=2),
            Comment(comment="Awesome content!", likes=1),
            Comment(comment="Superb mentor!", likes=5),
            Comment(comment="Very helpful.", likes=3),
            Comment(comment="Informative and interesting.", likes=4),
            Comment(comment="Loved it!", likes=1),
            Comment(comment="Highly recommended.", likes=2),
            Comment(comment="Looking forward to the next one.", likes=1),
            Comment(comment="Great learning experience.", likes=3),
            Comment(comment="Amazing materials.", likes=2),
        ]
        db.session.add_all(comments)
        db.session.commit()
        print("🌱 Data seeding completed!")
            # Sample data for Sessions
        announces = [
            Announcement(name="Session 1", announcements="Announcement 1", ),
            Announcement(name="Session 2", announcements="Announcement 2", ),
            # Add more sessions as needed
        ]
        db.session.add_all(announces)
        db.session.commit()

if __name__ == '__main__':
    with app.app_context():
        seed_data()
