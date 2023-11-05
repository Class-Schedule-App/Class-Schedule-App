from flask import Blueprint, request
from flask_restful import Resource, Api, reqparse
# from flask_jwt_extended import jwt_required
from ..models.Module import Module
from ..models.Config import db
from ..models.MarshmallowSchemas.ModuleSchema import ModuleSchema

module = Blueprint('module', __name__)
api = Api(module)

module_parser = reqparse.RequestParser()
module_parser.add_argument('module_name', type=str, required=True, help='Module name is required')
module_parser.add_argument('date', type=str, required=True, help='Date is required')
module_parser.add_argument('time', type=str, required=True, help='Time is required')
module_parser.add_argument('invite_link', type=str, required=True, help='Invite link is required')

class ModulesResource(Resource):
    # @jwt_required()
    def get(self):
        modules = Module.query.all()
        module_list = [module.to_dict() for module in modules]
        return module_list
    
    def post(self):
        data = module_parser.parse_args()
        module = Module(
            module_name=data['module_name'],
            date=data['date'],
            time=data['time'],
            invite_link=data['invite_link']
        )
        db.session.add(module)
        db.session.commit()
        return module.to_dict(), 201
    def patch(self, module_id):
        module = Module.query.get(module_id)
        if not module:
            return {'message': 'Module not found'}, 404

        data = module_parser.parse_args()
        module.module_name = data['module_name']
        module.date = data['date']
        module.time = data['time']
        module.invite_link = data['invite_link']

        db.session.commit()
        return module.to_dict()
class ModuleId(Resource):
    # @jwt_required()
    def get(self, id):
        mod = Module.query.get_or_404(id)
        schema = ModuleSchema()

        return {"user": schema.dump(mod)}
    
api.add_resource(ModulesResource, '/modules')   
api.add_resource(ModuleId, '/modules/<int:id>')