from flask import Flask
from flask_login import LoginManager
from models.config import db

def create_app():
    app = Flask(__name__)

    app.config['SECRET_KEY'] = 'secret-key-goes-here'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://austine:0ypd6XocLkp7X2mEJc6LVZlde382o9QX@dpg-cka02mtdrqvc739q0u1g-a.ohio-postgres.render.com/class_schedule_app'

    db.init_app(app)

    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)

    from models.users_model import Users

    @login_manager.user_loader
    def load_user(user_id):
        # since the user_id is just the primary key of our user table, use it in the query for the user
        return Users.query.get(int(user_id))

    # blueprint for auth routes in our app
    # from .auth import auth as auth_blueprint
    # app.register_blueprint(auth_blueprint)

    # # blueprint for non-auth parts of app
    # from .main import main as main_blueprint
    # app.register_blueprint(main_blueprint)

    return app
