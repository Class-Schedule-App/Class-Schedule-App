from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired

class CommentsForm(FlaskForm):
    id = IntegerField('Comment ID', validators=[DataRequired()])
    comment = StringField('Comment', validators=[DataRequired()])

    class Meta:
        csrf = False