from flask import Blueprint, jsonify, session, request, redirect
from app.models import Message, db

messages_routes = Blueprint('messages', __name__)

@messages_routes.route('/<int:channelId>')
def get_messages(channelId):
    messages = Message.query.filter(Message.channelId == channelId).all()
    print(messages)
    return {'messages': [message.to_dict() for message in messages]}
