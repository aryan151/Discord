from .db import db

class DMServer(db.Model):
    __tablename__ = 'dm_servers'

    id = db.Column(db.Integer, primary_key=True)
    ownerId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    avatar = db.Column(db.String(500), default='https://cdn.discordapp.com/embed/avatars/0.png')
    name = db.Column(db.String(50), nullable=False)
    banner = db.Column(db.String(500), default='https://images.pexels.com/videos/3045163/free-video-3045163.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500')

    #relationships
    # channels = db.relationship('Channel', back_populates='server')
    # owner = db.relationship('User', back_populates='dm_server')




    def to_dict(self):
        return {
            'id': self.id,
            'ownerId': self.ownerId,
            'name': self.name,
            'avatar': self.avatar,
            'banner': self.banner
        }
