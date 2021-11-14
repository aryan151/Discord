from sqlalchemy.orm import defaultload
from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    avatar = db.Column(db.String(2000), nullable=True, default='https://cdn.discordapp.com/embed/avatars/0.png')
    hashed_password = db.Column(db.String(255), nullable=False)
    online = db.Column(db.Boolean, default=False)
    went_offline = db.Column(db.String(200), default=None)

    #relationships

    messages = db.relationship('Message', back_populates='user', cascade='all, delete')
    servers = db.relationship('Server', back_populates='user', cascade='all, delete')
    server_members = db.relationship('ServerMember', cascade='all, delete')

    # dm_server = db.relationship('DMServer', back_populates='owner', cascade='all, delete')

    # dm_sender = db.relationship('DMMessage', back_populates='sender', cascade='all, delete')
    # dm_receiver = db.relationship('DMMessage', back_populates='receiver')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'avatar': self.avatar,
            'email': self.email,
            'online': self.online,
            'went_offline': self.went_offline
        }
