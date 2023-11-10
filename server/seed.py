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
            User(username="Alice", email="alice@example.com", phone_number="722577344", user_type="student", password=generate_password_hash("password1")),
            User(username="Bob", email="bob@example.com", phone_number="0744556688", user_type="technical_mentor", password=generate_password_hash("password2")),
            User(username="Charlie", email="charlie@example.com", phone_number="722577344", user_type="student", password=generate_password_hash("password3")),
            User(username="David", email="david@example.com", phone_number="4444444444", user_type="technical_mentor", password=generate_password_hash("password4")),
        ]
        db.session.add_all(users)
        db.session.commit()


        # Sample data for Students
        students = [
            Student(name="Alice Student", email="alice@student.com", student_id=1,phone_number="722577344"),
            Student(name="Bob Student", email="bob@student.com",  student_id=2, phone_number="722577344"),
            Student(name="Charlie Student", email="charlie@student.com",  student_id=3, phone_number="722577344"),
            Student(name="David Student", email="david@student.com",  student_id=4),
            Student(name="Eva Student", email="eva@student.com",  student_id=5),
            Student(name="Frank Student", email="frank@student.com",  student_id=6),
            Student(name="Grace Student", email="grace@student.com", student_id=7),
            Student(name="Henry Student", email="henry@student.com",student_id=8),
            Student(name="Ivy Student", email="ivy@student.com", student_id=9),
            Student(name="Jack Student", email="jack@student.com", student_id=10),
        ]
        db.session.add_all(students)
        db.session.commit()

        # Sample data for Technical Mentors
        # mentors = [
        #     TechnicalMentor(name="Alice Mentor", email="alice@mentor.com", profile_img="alice.jpg"),
        #     TechnicalMentor(name="Bob Mentor", email="bob@mentor.com", profile_img="bob.jpg"),
            
        # ]
        # db.session.add_all(mentors)
        # db.session.commit()

        # Sample data for Modules
        modules = [
            Module(module_name="Software Engineering ", invite_link="link_a"),
            Module(module_name="Data Science", invite_link="link_b"),
            Module(module_name="DevOps", invite_link="link_c"),
            Module(module_name="Product Design", invite_link="link_d"),
            Module(module_name="Cyber Security", invite_link="link_e"),
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
            Session(name="Software Engineering ", announcements="Announcement 1", module_id=1, start_time="10:00 AM", end_time="12:00 PM", invite_link="https://example.com/session1", location="Webinar",   date="2023-10-27"),
            Session(name="Data Science", announcements="Announcement 2", module_id=2,start_time="1:00 PM", end_time="3:00 PM", invite_link="https://example.com/session2", location="Virtual Classroom",   date="2023-10-27"),
            Session(name="Cyber Security", announcements="Announcement 3", module_id=3, start_time="2:00 PM", end_time="4:00 PM", invite_link="https://example.com/session3", location="Conference Room B",   date="2023-10-27"),
            Session(name="Product Design", announcements="Announcement 4", module_id=4, start_time="3:00 PM", end_time="5:00 PM", invite_link="https://example.com/session4", location="Training Hall",  date="2023-10-27"),
            Session(name="DevOps", announcements="Announcement 5", module_id=5,start_time="10:00 AM", end_time="12:00 PM", invite_link="https://example.com/session5", location="Meeting Room A",  date="2023-10-27"),
            Session(name="Robotics", announcements="Announcement 5", module_id=5,start_time="10:00 AM", end_time="12:00 PM", invite_link="https://example.com/session5", location="Meeting Room A",  date="2023-10-27"),
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
            Announcement(name="lorem ipsum", announcements="Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original." ),
            Announcement(name="Session 3", announcements="Tangazo tangazo!", ),

            # Add more sessions as needed
        ]
        db.session.add_all(announces)
        db.session.commit()

if __name__ == '__main__':
    with app.app_context():
        seed_data()
