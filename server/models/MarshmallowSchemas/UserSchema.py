from marshmallow import fields, validate, validates_schema, ValidationError
from ..User import User
from ..Config import ma

class UserSchema(ma.SQLAlchemyAutoSchema):
    username = fields.String(required=True)
    email = fields.String(required=True, validate=[validate.Email()])
    phone_number = fields.Integer(required=True)
    password = fields.String(required=True)
    created_at = fields.DateTime(required=True)
    updated_at = fields.DateTime(required=True)
    user_type = fields.String(required=True)

    @validates_schema
    def validate_email(self, data, **kwargs):
        email = data.get("email")

        if User.query.filter_by(email=email).count():
            raise ValidationError(f"Email {email} already exists.")
    class Meta:
        model = User
        exclude = ["id", "password", "created_at", "updated_at"]