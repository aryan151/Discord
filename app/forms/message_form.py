from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField

from app.models import dm_server

class MessageForm(FlaskForm):
    body = StringField('body')
    userId = IntegerField('userId')
    channelId = IntegerField('channelId')

class DmMessageForm(FlaskForm):
    body = StringField('body')
    senderId = IntegerField('senderId')
    dm_server_Id = IntegerField('dm_server_Id')
    username = StringField('username')
    imageUrl = StringField('imageUrl')
