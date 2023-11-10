from marshmallow import fields
from ..Comment import Comment
from ..Config import ma

class CommentSchema(ma.SQLAlchemyAutoSchema):
    comment = fields.String(required=True)
    likes = fields.Integer(required=False)

    class Meta:
        model = Comment