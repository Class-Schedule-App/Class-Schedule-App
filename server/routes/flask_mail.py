from flask_restful import Api, Resource
from flask import Blueprint
from flask_mail import Message
from ..models.Config import mail

flask_mail = Blueprint('flask_mail', __name__)
api = Api(flask_mail)

class Mail(Resource):
    def get(self):
        msg = Message(
            subject= 'Hey there ..',
            recipients= ['yejedoj782@qianhost.com'],
            body= 'This is a test email sent from James\' app. You don\'t have to reply.',
            html=  '',   
            sender= '',
            cc= '',
            bcc= '',
            attachments= [],
            reply_to='',
            date='date'
        )
        mail.send(msg)
        return 'Message has been sent!'

api.add_resource(Mail, '/flask_mail')