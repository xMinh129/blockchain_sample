from flask import request, json, jsonify, Response
from blockchain_hack.main import db_session
from blockchain_hack.models import Users
from blockchain_hack.auth import decode_auth_token, encode_auth_token

JSON_RESPONSE_TYPE = 'application/json'

HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': ['OPTIONS', 'GET', 'POST'],
    'Access-Control-Allow-Headers': 'Content-Type'
}


class UserController(object):

    def __init__(self, app):

        @app.route('/api/users/new', methods=['POST'])
        def create_user():
            if request.method == 'POST':
                payload = json.loads(request.data)
                user = Users(payload['email'],
                             payload['userName'],
                             payload['fullName'],
                             payload['password'])
                try:
                    db_session.add(user)
                    db_session.commit()
                    success_message = "You have successfully signed up! Now you can log in with the new account."
                    return jsonify(success=True,
                                   message=success_message)

                except:
                    return jsonify(success=False)

        @app.route("/api/users", methods=["POST"])
        def get_token():
            user = Users.get_user_with_username_and_password(request.values['userName'],
                                                             request.values['password'])
            user_data = {
                'userName': user.userName,
                'password': user.password
            }
            if user:
                return jsonify(user=user_data, token=encode_auth_token(user.id).decode("utf-8"))

            return jsonify(error=True), 403

        @app.route("/api/is_token_valid", methods=["POST"])
        def is_token_valid():
            is_valid = decode_auth_token(json.loads(request.data)['token'])

            if is_valid:
                return jsonify(token_is_valid=True)
            else:
                return jsonify(token_is_valid=False), 403
