from app.models.servermembers import ServerMember
from .db import db

class Server(db.Model):
    __tablename__ = 'servers'

    id = db.Column(db.Integer, primary_key=True)
    ownerId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    avatar = db.Column(db.String(500), default='https://cdn.discordapp.com/embed/avatars/0.png')
    banner = db.Column(db.String(500), default='https://images.pexels.com/videos/3045163/free-video-3045163.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500')

    #relationships
    channels = db.relationship('Channel', back_populates='server', cascade='all, delete')
    user = db.relationship('User', back_populates='servers')
    server_members = db.relationship('ServerMember', back_populates='servers', cascade='all, delete')


    def to_dict(self):
        return {
            'id': self.id,
            'ownerId': self.ownerId,
            'name': self.name,
            'avatar': self.avatar,
            'banner': self.banner
        }
