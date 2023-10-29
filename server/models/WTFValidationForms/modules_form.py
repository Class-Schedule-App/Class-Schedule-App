from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired

class ModulesForm(FlaskForm):
    id = IntegerField('Module ID', validators=[DataRequired()])
    module_name = StringField('Module Name', validators=[DataRequired()])
    date = StringField('Date', validators=[DataRequired()])
    time = StringField('Time', validators=[DataRequired()])
    invite_link = StringField('Invite Link', validators=[DataRequired()])

    class Meta:
        csrf = False