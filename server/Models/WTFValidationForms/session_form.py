from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeField
from wtforms.validators import DataRequired

class SessionForm(FlaskForm):
    session_id = IntegerField('Session ID', validators=[DataRequired()])
    name = StringField('Name', validators=[DataRequired()])
    announcements = StringField('Announcements', validators=[DataRequired()])
    created_at = DateTimeField('Created At', validators=[DataRequired()])
    updated_at = DateTimeField('Updated At', validators=[DataRequired()])

    class Meta:
        csrf = False