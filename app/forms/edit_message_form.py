from flask_wtf import FlaskForm
from wtforms import StringField

class EditMessageForm(FlaskForm):
    body = StringField('body')
