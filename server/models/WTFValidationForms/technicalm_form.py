from flask_wtf import FlaskForm
from wtforms import StringField, DateTimeField
from wtforms.validators import DataRequired

class TechnicalMentorForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    email = StringField('Email', validators=[DataRequired()])
    profile_img = StringField('Profile Image', validators=[DataRequired()])
    created_at = DateTimeField('Created At', validators=[DataRequired()])

    class Meta:
        csrf = False