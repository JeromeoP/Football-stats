from flask import Flask, jsonify, request, send_from_directory

from gevent.pywsgi import WSGIServer
from geventwebsocket.handler import WebSocketHandler
from geventwebsocket import WebSocketError
import uuid
from flask_cors import CORS
import database_helper
import retrieveData
import matplotlib
matplotlib.use('Agg')


app = Flask(__name__)
CORS(app)


@app.teardown_request
def after_request(exception):
    database_helper.disconnect_db()


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/sign-up", methods=['POST'])
def sign_up():
    print("we got here")
    data = request.get_json()
    print(data)
    username = data["username"]
    firstname = data['firstname']
    lastname = data['lastname']
    email = data['email']
    password = data['password']
    password2 = data['password2']

    if password2 == password:
        if database_helper.new_user(email, password, firstname, lastname, username):

            return jsonify({"success": True, "message": "Successfully created a new user."})
        else:
            return jsonify({"success": False, "message": data})       
    else:
        return jsonify({"success": False, "message": "Not matching passwords"})       


@app.route('/sign-in', methods=['POST'])
def sign_in():
    data = request.get_json()
    email = data['email']
    password = data['password']
    if (database_helper.valid_user(email, password)):
        print("kommer vi hit?")

        token = str(uuid.uuid4())

        database_helper.put_logged_in_user(email, token)
        return jsonify(
            {"success": True, "message": "Successfully signed in.", "data": token})
    else:
        return jsonify(
        {"success": False, "message": "Wrong username or password"}
        )

@app.route('/sign-out', methods=['POST'])
def sign_out():
    data = request.get_json()
    token = request.headers.get("token") #headers
    email = data["email"]
    is_signed_in = database_helper.check_logged_in_users(email, token)


    if (is_signed_in):
        database_helper.delete_logged_in_user(token)
        return jsonify({"success": True, "message": "Successfully signed out."}),200
    else:
        return jsonify({"success": False, "message": "You are not signed in."}),405


@app.route('/search', methods=['POST'])
def playerSearch():
    data = request.get_json()
    player1 = data["player1"]
    player2 = data["player2"]
    compareData = data["compareData"]

    if retrieveData.get_player(player1,player2, compareData):
        print("are we ever here?")
        return jsonify({"success": True, "message": "Successfully created a chart"}),200
    else:
        print("or are we ever here?")
        return jsonify({"success": False, "message": "Could not create a chart"}),405

    


if __name__ == "__main__":
    print("sever started")
   # http_server = WSGIServer(('', 3000), app, handler_class = WebSocketHandler)

    #http_server.serve_forever()
    app.run()

