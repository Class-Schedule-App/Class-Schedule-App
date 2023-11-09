from marshmallow import fields, validate, validates_schema, ValidationError
from flask import request
from ..Student import Student
from ..Config import ma

class StudentSchema(ma.SQLAlchemyAutoSchema):
    name = fields.String(required=True)
    email = fields.String(required=True, validate=[validate.Email()])
    phone_number = fields.Integer(required=True)
    profile_img = fields.String(required=False)
    user_id = fields.Integer(required=False)

    class Meta:
        model = Student
        exclude = ["id", "created_at" ]

    @validates_schema
    def validate_email(self, data, **kwargs):
        if request.method == "POST":
            email = data.get("email")

            if Student.query.filter_by(email=email).count():
                raise ValidationError(f"Email {email} already exists.")

