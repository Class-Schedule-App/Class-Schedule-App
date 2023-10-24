  ##Class Schedule App
Problem Statement
Since Moringa School moved to remote learning, there have been many concerns from the students on knowing when sessions are running or certain classroom activities like student check-ins, unblocking sessions, or workshops. Currently, there are no applications dedicated to this in Moringa. Students want to participate in courses, see announcements in these courses and also have schedules mapped so that they know when sessions or certain classroom activities are running, but have this information spread out on communication channels. They also want to find fellow students with the same interests and share their opinion about courses and course material, however, this is not possible yet. 
Case Scenario
Peter, an incoming student and is studying Fullstack at Moringa School. He is definitely not sure how the classes are run and the schedule for upcoming classroom sessions. Invites are currently sent out via the Calendar Invites, Slack, or Email in this could prove to be a problem since there’s no onboarding for this. He might also not be familiar with the said platforms, therefore more complications arise.

Your task is to create an automated system that can centralize the information entered into so that he can browse through the respective module in the course catalog of the App and finds the sessions, for example, a Resourcefulness Workshop with day, time and the necessary info such as the Invitation links, a brief description of the session and more. While he is attending the sessions, he makes contact with fellow students who also attend the session and read their comments. He likes one comment “Great session” by Susan, who is also in the same session.
Minimum Viable Product
The first version of work that is expected must meet the following metrics:
Allow for user authentication, both for Students and TMs
TM can post schedules, check week’s/day’s schedule
TM can update schedule in case anything arises
TM can search for available sessions: Can see all sessions of the current module
TM can check and update session details: Can see details about a session such as the session times, Invitation Links and other session attendees 
TM can post announcements: A TM can post session announcements.
TM can add students to modules and send out invites.
Students can search for available sessions: Can see all sessions of the current module
Students can check session details: Can see details about a session such as the session times, Invitation Links and other session attendees
Students can view announcements: A student can view course announcements and comment/like them.
Students can update profile: A student can update his profile settings and his profile picture. He can also change the notification settings.
Students can add comments: A student can add comments about a session and thus start a discussion. Others can like the comment and write follow-up comments.
Technical Objectives
All commits must be descriptive
Before a commit is accepted, it must be reviewed by 2 members and the project lead
Each feature must have its own branch
All feature branches are to be deleted once the pull request is accepted.
The project must have unit tests, UI tests, and must maintain a  test coverage of above 85% for both UI and Unit tests.
The code should be in a modular format such that if one module of the project fails it does not affect other modules that are not related to it.
Technologies
Backend: Flask , Python
Database: PostgreSQL
Wireframes: Figma (Should be mobile friendly)
Testing Framework: ​Jest & Minitests
Frontend: ReactJs & Redux Toolkit(state management)
