from pymongo import MongoClient
from flask import g, current_app
def get_db():
    if 'db' not in g:
        mongo_uri = current_app.config['MONGO_URI']
        db_name = current_app.config['MONGO_DB_NAME'] # Directly use the configured DB name
        client = MongoClient(mongo_uri)
        g.db = client[db_name]
    return g.db