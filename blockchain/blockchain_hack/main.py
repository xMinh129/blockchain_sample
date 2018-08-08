from flask import Flask, Response, json
from flask_cors import CORS
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session
from config import BaseConfig
from flask_bcrypt import Bcrypt

app = Flask(__name__, static_folder="./static/dist", template_folder="./static")
app.config.from_object(BaseConfig)
cors = CORS(app)
bcrypt = Bcrypt(app)
engine = create_engine('mysql+pymysql://easy_nmr_12995:backtonus#129@medslack-dal.database.windows.net:1433/medslack-dev')
engine.echo = True
Session = scoped_session(sessionmaker(bind=engine))
db_session = Session()

from blockchain_hack.controllers.users_controller import UserController

UserController(app)


@app.route('/health_check', methods=['GET'])
def health_check():
    """
    Health check
    """
    return Response(json.dumps({'reply': 'I\'m ok'}))
