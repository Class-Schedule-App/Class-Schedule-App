from werkzeug.security import generate_password_hash
from sqlalchemy import or_
from marshmallow import fields, validate, validates_schema, ValidationError
from ..User import User
from ..Config import ma

class UserSchema(ma.SQLAlchemyAutoSchema):
    username = fields.String(required=True)
    email = fields.String(required=True, validate=[validate.Email()])
    phone_number = fields.Integer(required=True)
    password = fields.String(required=True, validate=[validate.Length(min=8, max=256)])
    created_at = fields.DateTime(required=True)
    updated_at = fields.DateTime(required=True)
    user_type = fields.String(required=True)

    @staticmethod
    def generate_password_hash(password):
        return generate_password_hash(password, method='pbkdf2:sha256')

    @validates_schema
    def validate_password(self, data, **kwargs):
        data['password'] = self.generate_password_hash(data['password'])

    @validates_schema
    def validate_email(self, data, **kwargs):
        email = data.get("email")

        if User.query.filter(or_(User.email == email, User.phone_number == email)).count():
            raise ValidationError(f"Email or phone number {email} already exists.")

    class Meta:
        model = User
        exclude = [ "created_at", "updated_at"]