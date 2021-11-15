import os
from flask import Flask, render_template, request, session, redirect
from flask.json.tag import JSONTag
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager
from werkzeug.wrappers.request import StreamOnlyMixin

from .models import db, User
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.channels_routes import channels_routes
from .api.servers_routes import servers_routes
from .api.messages_routes import messages_routes

from .api.channels_routes import channels_routes

from .api.servers_routes import servers_routes
from .api.members import members_routes
from .api.dm_messages_routes import dm_messages_routes
from .seeds import seed_commands
from flask_socketio import emit, disconnect, send, join_room, leave_room

from .config import Config
from .socket import socketio

app = Flask(__name__)


# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'




# handle chat messages



@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(channels_routes ,url_prefix='/api/channels')
app.register_blueprint(servers_routes, url_prefix='/api/servers')
app.register_blueprint(messages_routes, url_prefix='/api/messages')
app.register_blueprint(members_routes, url_prefix='/api/members')
app.register_blueprint(dm_messages_routes, url_prefix='/api/dms')

db.init_app(app)
Migrate(app, db)
socketio.init_app(app)

# Application Security
CORS(app)


# Since we are deploying with Docker and Flask,
# we won't be using a buildpack when we deploy to Heroku.
# Therefore, we need to make sure that in production any
# request made over http is redirected to https.
# Well.........
@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict' if os.environ.get(
            'FLASK_ENV') == 'production' else None,
        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')



@socketio.on("join")
def join(data):
    print('Join room', data)
    room = data
    join_room(room)
    # send(' has entered the room.', to=room)


# @socketio.on("chat")
# def handle_chat(data):
#     print(data, 'HELLLLLLOOOOO!!!!!!!!')
#     room = data['channelId']
#     emit('chat', {'data' : {'msg' : data['msg'], 'user' : data['user']}}, to=room, broadcast=True, include_self=False, json=True)

@socketio.on("chat")
def handle_chat(data):
    print(data, 'HELLLLLLOOOOO!!!!!!!!')
    room = data['channelId']
    emit('chat', data['msg'], to=room, broadcast=True)

if __name__ == '__main__':
    socketio.run(app)
