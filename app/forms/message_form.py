from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField

class MessageForm(FlaskForm):
    body = StringField('body')
    userId = IntegerField('userId')
    channelId = IntegerField('channelId')
    imageUrl = StringField('imageUrl')
    userName = StringField('userName')
