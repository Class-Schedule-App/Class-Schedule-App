# Class Schedule App

## Problem Statement

Since Moringa School moved to remote learning, there have been many concerns from the students on knowing when sessions are running or certain classroom activities like student check-ins, unblocking sessions, or workshops. Currently, there are no applications dedicated to this in Moringa. Students want to participate in courses, see announcements in these courses and also have schedules mapped so that they know when sessions or certain classroom activities are running, but have this information spread out on communication channels. They also want to find fellow students with the same interests and share their opinion about courses and course material; however, this is not possible yet.

### Case Scenario

Peter, an incoming student, is studying Fullstack at Moringa School. He is not sure how the classes are run and the schedule for upcoming classroom sessions. Invites are currently sent out via Calendar Invites, Slack, or Email, and this could prove to be a problem since there’s no onboarding for this. He might also not be familiar with the said platforms, therefore more complications arise.

Our task is to create an automated system that can centralize the information entered into so that he can browse through the respective module in the course catalog of the App and find the sessions. For example, a Resourcefulness Workshop with day, time, and the necessary information such as the Invitation links, a brief description of the session, and more. While he is attending the sessions, he makes contact with fellow students who also attend the session and reads their comments. He likes one comment “Great session” by Susan, who is also in the same session.

## Minimum Viable Product

The first version of work that is expected must meet the following metrics:

**For TM (Teaching Mentors):**
- Allow for user authentication, both for Students and TMs
- TMs can post schedules, check week’s/day’s schedule
- TMs can update schedule in case anything arises
- TMs can search for available sessions: Can see all sessions of the current module
- TMs can check and update session details: Can see details about a session such as the session times, Invitation Links, and other session attendees
- TMs can post announcements: A TM can post session announcements.
- TMs can add students to modules and send out invites.

**For Students:**
- Students can search for available sessions: Can see all sessions of the current module
- Students can check session details: Can see details about a session such as the session times, Invitation Links, and other session attendees
- Students can view announcements: A student can view course announcements and comment/like them.
- Students can update profile: A student can update his profile settings and his profile picture. He can also change the notification settings.
- Students can add comments: A student can add comments about a session and thus start a discussion. Others can like the comment and write follow-up comments.

## Project Setup
- Clone this repo into your local machine.
- cd into the server directory.
- Run pipenv install to get the flask dependencies installed
- Run pipenv shell to get into the virtual env
- cd into the server directory and run export FLASK_RUN_PORT=5555
- Run flask run to start your backend server
### Frontend Setup
- To setup your frontend,cd into class_shedule directory
- run npm install
- run npm start
- You can then view your react app on browser


## Technologies

- **Backend:** Flask, Python
- **Database:** PostgreSQL
- **Wireframes:** Figma (Should be mobile-friendly)
- **Testing Framework:** Jest & Minitests
- **Frontend:** ReactJs & Redux Toolkit (state management)
- 
## Members 

1.Dorine Watene
2.Austine Were : Scrum Master 
3.Timothy Baraka 
4.Roy Kirorei
5.James Mutio
6. Grace Kungu
