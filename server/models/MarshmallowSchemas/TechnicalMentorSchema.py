from marshmallow import fields
from ..Technical_mentor import TechnicalMentor
from ..Config import ma

class TechnicalMentorSchema(ma.SQLAlchemyAutoSchema):
    name = fields.String(required=True)
    email = fields.String(required=True)
    profile_img = fields.String(required=True)
    created_at = fields.DateTime(required=True)

    class Meta:
        model = TechnicalMentor