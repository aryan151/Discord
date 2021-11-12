from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField

class ServerForm(FlaskForm):
    name = StringField('name')
    owner_id = IntegerField('owner_id')
    tag = StringField('tag')
    avatar = StringField('avatar')
    banner = StringField('banner') 
