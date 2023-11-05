import os
import hashlib
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
        salt = hashlib.sha256(os.urandom(64)).hexdigest()
        pw_hash = hashlib.pbkdf2_hmac(
            'sha256', password.encode('utf-8'), salt.encode('utf-8'), 100000
        )
        return pw_hash.decode('utf-8')

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
        exclude = ["id", "created_at", "updated_at"]