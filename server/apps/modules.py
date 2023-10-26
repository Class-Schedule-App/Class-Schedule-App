from models import ModulesForm
from main import request, Resource, api, reqparse, db

module_parser = reqparse.RequestParser()
module_parser.add_argument('module_name', type=str, required=True, help='Module name is required')
module_parser.add_argument('date', type=str, required=True, help='Date is required')
module_parser.add_argument('time', type=str, required=True, help='Time is required')
module_parser.add_argument('invite_link', type=str, required=True, help='Invite link is required')

class ModulesResource(Resource):
    def get(self):
        modules = ModulesForm.query.all()
        module_list = [module.to_dict() for module in modules]
        return module_list
    
    def post(self):
        data = module_parser.parse_args()
        module = ModulesForm(
            module_name=data['module_name'],
            date=data['date'],
            time=data['time'],
            invite_link=data['invite_link']
        )
        db.session.add(module)
        db.session.commit()
        return module.to_dict(), 201
    def patch(self, module_id):
        module = ModulesForm.query.get(module_id)
        if not module:
            return {'message': 'Module not found'}, 404
        
        data = module_parser.parse_args()
        module.module_name = data['module_name']
        module.date = data['date']
        module.time = data['time']
        module.invite_link = data['invite_link']

        db.session.commit()
        return module.to_dict()
