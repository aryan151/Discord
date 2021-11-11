from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField

class EditServerForm(FlaskForm):
    name = StringField('name')
