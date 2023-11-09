from flask import Blueprint, request, jsonify
from flask_restful import Resource, Api, reqparse
# from flask_jwt_extended import jwt_required
from ..models.Module import Module
from ..models.Config import db
from ..models.MarshmallowSchemas.ModuleSchema import ModuleSchema
from marshmallow import ValidationError

module = Blueprint('module', __name__)
api = Api(module)

class ModulesResource(Resource):
    # @jwt_required
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
            return schema.dump(modulex)  # Changed 'module' to 'modulex'
        else:
            return {'message': 'Module not found'}, 404

    def patch(self, id):
        try:
            schema = ModuleSchema(partial=True)
            modulex = Module.query.get_or_404(id)
            modulex = schema.load(request.json, instance=modulex)

            db.session.add(modulex)
            db.session.commit()

            return {"msg": "Module updated", "user": schema.dump(modulex)}
        except ValidationError as e:
            return handle_marshmallow_error(e), 400
        
    def delete(self, id):
        mod = Module.query.get(id)
        if not mod:
            return jsonify(message="Session not found"), 404
      
        db.session.delete(mod)
        db.session.commit()
        return jsonify(message="Session deleted successfully")


api.add_resource(ModulesResource, '/modules')
api.add_resource(ModuleId, '/modules/<int:id>')

@module.errorhandler(ValidationError)
def handle_marshmallow_error(e):
    return (e.messages), 400