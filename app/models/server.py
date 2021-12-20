import random, string
from datetime import datetime, timedelta
# from enum import unique
from app.models.servermembers import ServerMember
from sqlalchemy.sql import func
from .db import db

# def randomword():
#     return ''.join(random.choice(string.ascii_lowercase) for i in range(12))

class Server(db.Model):
    __tablename__ = 'servers'

    id = db.Column(db.Integer, primary_key=True)
    ownerId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    avatar = db.Column(db.String(1000), default='https://cdn.discordapp.com/embed/avatars/0.png')
    banner = db.Column(db.String(1000), nullable=True, default='https://images.pexels.com/videos/3045163/free-video-3045163.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500')
    tag = db.Column(db.String(50), nullable=True, default='Home')
    join_password = db.Column(db.String(255), default="randomword", nullable=True)
    createdAt = db.Column(db.DateTime, nullable=False, default=func.now())

    #relationships
    channels = db.relationship('Channel', back_populates='server', cascade='all, delete')
    user = db.relationship('User', back_populates='servers')
    server_members = db.relationship('ServerMember', back_populates='servers', cascade='all, delete-orphan')


    def to_dict(self):
        return {
            'id': self.id,
            'ownerId': self.ownerId,
            'name': self.name,
            'avatar': self.avatar,
            'banner': self.banner,
            'tag': self.tag,
            'join_password': self.join_password,
            'createdAt': self.createdAt.strftime("%Y/%m/%d %H:%M:%S")

        }
