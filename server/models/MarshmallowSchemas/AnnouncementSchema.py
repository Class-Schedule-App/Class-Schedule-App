from marshmallow import fields
from ..Announcement import Announcement
from ..Config import ma

class AnnouncementSchema(ma.SQLAlchemyAutoSchema):
    name = fields.String(required=True)
    announcements = fields.String(required=True)
    
    class Meta:
        model = Announcement