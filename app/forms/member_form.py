from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField

class MemberForm(FlaskForm):
    serverId = IntegerField('serverId')
    userId = IntegerField('userId')
    admin = BooleanField('admin')
