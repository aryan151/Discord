from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField

class ChannelForm(FlaskForm):
    name = StringField('name')
    serverId = IntegerField('serverId')

class ChannelEditForm(FlaskForm):
    name = StringField('name')
    description = StringField('description')
