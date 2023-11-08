from flask import Blueprint, request
from flask_restful import Resource, Api, reqparse
# from flask_jwt_extended import jwt_required
from ..models.Module import Module
from ..models.Config import db
from ..models.MarshmallowSchemas.ModuleSchema import ModuleSchema
from marshmallow import ValidationError

module = Blueprint('module', __name__)
api = Api(module)

class ModulesResource(Resource):
    def get(self):
        modules = Module.query.all()
        schema = ModuleSchema(many=True)
        return schema.dump(modules)
    
    def post(self):
        try:
            module_schema = ModuleSchema()
            validated_data = module_schema.load(request.json)
            new_module = Module(**validated_data)
            db.session.add(new_module)
            db.session.commit()
            return new_module.to_dict(), 201
        except ValidationError as e:
            return handle_marshmallow_error(e), 400

class ModuleId(Resource):
    def get(self, id):
        modulex = Module.query.get(id)
        if modulex:
            schema = ModuleSchema()
            return schema.dump(module)
        else:
            return {'message': 'Module not found'}, 404

    def patch(self, module_id):
        modulex = Module.query.get(module_id)
        if not modulex:
            return {'message': 'Module not found'}, 404

        try:
            module_schema = ModuleSchema()
            data = module_schema.load(request.json)
            module.module_name = data['module_name']
            module.date = data['date']
            module.time = data['time']
            module.invite_link = data['invite_link']

            db.session.commit()
            return module.to_dict()
        except ValidationError as e:
            return handle_marshmallow_error(e), 400

api.add_resource(ModulesResource, '/modules')
api.add_resource(ModuleId, '/modules/<int:module_id>')

@module.errorhandler(ValidationError)
def handle_marshmallow_error(e):
    return (e.messages), 400