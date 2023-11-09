from marshmallow import fields
from ..Session import Session
from ..Config import ma

class SessionSchema(ma.SQLAlchemyAutoSchema):
    name = fields.String(required=True)
    announcements = fields.String(required=True)
    invite_link = fields.String(required=True)
    location = fields.String(required=True)
    date = fields.DateTime(required=True)
    start_time = fields.String(required=True)
    end_time = fields.String(required=True)
    created_at = fields.DateTime(required=False)
    updated_at = fields.DateTime(required=False)

    class Meta:
        model = Session