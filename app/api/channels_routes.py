from flask import Blueprint, jsonify, request, redirect
from app.models import Server, Channel, channel, db
from sqlalchemy.orm import subqueryload
from app.forms import ChannelForm, ChannelEditForm


channels_routes = Blueprint('channels', __name__)

@channels_routes.route('/<int:id>', methods=['GET'])
def channels(id):
  if request.method == 'GET':
    channels = Channel.query.filter(Channel.serverId == id).all()


  if channels:
    data = {channels[0].serverId: [channel.to_dict() for channel in channels]}
    print(data)
    return data
  else:
    return {}

@channels_routes.route('/', methods = ['POST'])
def addChannel():
  form = ChannelForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():

      channel = Channel(
          name = form.data['name'],
          serverId=form.data['serverId']
      )

  # server = Server(name='fred', owner_id=1)
  db.session.add(channel)
  db.session.commit()
  return channel.to_dict()

@channels_routes.route('/delete/<int:channelId>', methods=['DELETE'])
def delete_channel(channelId):
  channel = Channel.query.filter(Channel.id == channelId).first()
  serverId = channel.serverId
  if channel:
    db.session.delete(channel)
    db.session.commit()
    return {"channelId": channel.id, "serverId": serverId}

@channels_routes.route('/edit/<int:channelId>', methods=['POST'])
def edit_channel(channelId):
  form = ChannelEditForm()
  # form['csrf_token'].data = request.cookies['csrf_token']
  # if form.validate_on_submit():
  # channelId = form.data["channelId"]
  name = form.data["name"]
  description = form.data["description"]
  channel = Channel.query.filter(Channel.id == channelId).first()

  if channel:
    channel.name = name
    channel.description = description
    db.session.add(channel)
    db.session.commit()
    return {"updated": True}
  else:
    return {"error": "no channels found"}
