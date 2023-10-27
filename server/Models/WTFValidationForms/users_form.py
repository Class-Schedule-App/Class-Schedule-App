from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeField
from wtforms.validators import DataRequired

class UsersForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired()])
    email = StringField('Email', validators=[DataRequired()])
    phone_number = IntegerField('Phone Number', validators=[DataRequired()])
    created_at = DateTimeField('Created At', validators=[DataRequired()])
    updated_at = DateTimeField('Updated At', validators=[DataRequired()])
    user_type = StringField('User Type', validators=[DataRequired()])

    class Meta:
        csrf = False