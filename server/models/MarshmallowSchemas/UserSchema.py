from marshmallow import fields
from ..User import User
from ..Config import ma

class UserSchema(ma.SQLAlchemyAutoSchema):
    username = fields.String(required=True)
    email = fields.String(required=True)
    phone_number = fields.Integer(required=True)
    created_at = fields.DateTime(required=True)
    updated_at = fields.DateTime(required=True)
    user_type = fields.String(required=True)

    class Meta:
        model = User