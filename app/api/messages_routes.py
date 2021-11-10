from flask import Blueprint, jsonify, session, request, redirect
from app.models import Message, db
from app.forms import MessageForm

messages_routes = Blueprint('messages', __name__)

@messages_routes.route('/<int:channelId>')
def get_messages(channelId):
    messages = Message.query.filter(Message.channelId == channelId).all()
    print(messages)
    return {'messages': [message.to_dict() for message in messages]}

@messages_routes.route('/<int:channelId>', methods=['POST'])
def add_message(channelId):
    form = MessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        message = Message(
            body = form.data['body'],
            channelId = channelId,
            userId = form.data['userId']
        )
    db.session.add(message)
    db.session.commit()
    return message.to_dict()


# hi
