from flask import Blueprint, jsonify
from app.models import Server, Channel


channels_routes = Blueprint('channels', __name__)

@channels_routes.route('/<int:id>')
def channels(id):
  channels = Channel.query.filter(Channel.serverId == id).all()
  print(channels)
  if channels:
    data = {channels[0].serverId: [channel.to_dict() for channel in channels]}
    print(data)


    return data
