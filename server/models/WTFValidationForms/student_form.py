from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeField
from wtforms.validators import DataRequired

class StudentForm(FlaskForm):
    student_id = IntegerField('Student ID', validators=[DataRequired()])
    name = StringField('Name', validators=[DataRequired()])
    email = StringField('Email', validators=[DataRequired()])
    profile_img = StringField('Profile Image', validators=[DataRequired()])
    created_at = DateTimeField('Created At')

    class Meta:
        csrf = False