from marshmallow import fields, validate
from ..Student import Student
from ..Config import ma

class StudentSchema(ma.SQLAlchemyAutoSchema):
    name = fields.String(required=True)
    email = fields.String(required=True, validate=[validate.Email()])
    profile_img = fields.String(required=True)
    created_at = fields.DateTime()

    class Meta:
        model = Student