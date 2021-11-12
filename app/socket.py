from flask_socketio import SocketIO, emit, disconnect, send, join_room, leave_room
import os
# create your SocketIO instance


# if os.environ.get('FLASK_ENV') == 'production':
#     origins = [
#         'http://actual-app-url.herokuapp.com',
#         'https://actual-app-url.herokuapp.com'
#     ]
# else:
#     origins = "*"

socketio = SocketIO(logger=True, engineio_logger=True, cors_allowed_origins='*')


# initialize your socket instance


# @socketio.on('join')
# def on_join(data):
#     username = str(data['user'])
#     room = str(data['room'])
#     join_room(room)
#     emit((username) + ' has entered the room.', to=room)

# handle chat messages
# @socketio.on("message")
# def handle_chat(data):
#     emit(str(data['msg']), broadcast=True)

# @socketio.on('leave')
# def on_leave(data):
#     username = data['user']
#     room = data['room']
#     leave_room(room)
#     emit(username + ' has left the room.', to=room)
