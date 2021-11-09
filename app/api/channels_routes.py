from flask import Blueprint, jsonify, request, redirect
from app.models import Server, Channel, db
from app.forms import ChannelForm


channels_routes = Blueprint('channels', __name__)

@channels_routes.route('/<int:id>')
def channels(id):
  channels = Channel.query.filter(Channel.serverId == id).all()

  if channels:
    data = {channels[0].serverId: [channel.to_dict() for channel in channels]}
    print(data)


    return data


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
