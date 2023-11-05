from marshmallow import fields
from ..Module import Module
from ..Config import ma

class ModuleSchema(ma.SQLAlchemyAutoSchema):
    module_name = fields.String(required=True)
    date = fields.String(required=True)
    time = fields.String(required=True)
    invite_link = fields.String(required=True)

    class Meta:
        model = Module
        exclude = ["id"]