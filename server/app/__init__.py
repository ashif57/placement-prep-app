from flask import Flask
from flask_cors import CORS
import os

def create_app():

    app = Flask(__name__)
    CORS(app)

    # Load configurations from config.py
    app.config.from_object('app.config.Config')
    
    # Register blueprints
    from .routes import auth_routes, question_routes, essay_routes, coding_routes, result_routes
    app.register_blueprint(auth_routes.bp)
    app.register_blueprint(question_routes.bp, name='question_routes_bp')
    app.register_blueprint(essay_routes.bp)
    app.register_blueprint(coding_routes.bp)
    app.register_blueprint(result_routes.bp)

    return app