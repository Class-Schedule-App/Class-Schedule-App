from marshmallow import fields, validate, validates_schema, ValidationError
from ..Technical_mentor import TechnicalMentor
from ..Config import ma

class TechnicalMentorSchema(ma.SQLAlchemyAutoSchema):
    name = fields.String(required=True)
    email = fields.String(required=True, validate=[validate.Email()])
    phone_number = fields.Integer(required=True)
    profile_img = fields.String(required=False)

    class Meta:
        model = TechnicalMentor

    @validates_schema
    def validate_email(self, data, **kwargs):
        email = data.get("email")

        if TechnicalMentor.query.filter_by(email=email).count():
            raise ValidationError(f"Email {email} already exists.")