from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField

class EditServerForm(FlaskForm):
    name = StringField('name')
    tag = StringField('tag')
    avatar = StringField('avatar')
    banner = StringField('banner') 
