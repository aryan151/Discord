from flask import Blueprint, jsonify, session, request, redirect
from app.models import Message, DMMessage, db
from app.forms import MessageForm, EditMessageForm


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
            userId = form.data['userId'],
            imageUrl = form.data['imageUrl'],
            userName = form.data['userName']
        )
    db.session.add(message)
    db.session.commit()
    return message.to_dict()

@messages_routes.route('/edit/<int:messageId>', methods=['POST'])
def update_message(messageId):
    form = EditMessageForm()
    message = Message.query.get(messageId)
    message.body = form.data['body']
    db.session.commit()
    return message.to_dict()

@messages_routes.route('/delete/<int:messageId>', methods=['DELETE'])
def delete_message(messageId):
    message = Message.query.get(messageId)
    db.session.delete(message)
    db.session.commit()
    return { 'messageId' : messageId, 'channelId' : message.channelId }

# hi
