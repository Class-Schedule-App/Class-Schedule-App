from marshmallow import fields
from ..Session import Session
from ..Config import ma

class SessionSchema(ma.SQLAlchemyAutoSchema):
    name = fields.String(required=True)
    announcements = fields.String(required=True)
    created_at = fields.DateTime(required=True)
    updated_at = fields.DateTime(required=True)

    class Meta:
        model = Session