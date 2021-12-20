from .db import db

class DMServer(db.Model):
    __tablename__ = 'dm_servers'

    id = db.Column(db.Integer, primary_key=True)
    ownerId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    avatar = db.Column(db.String(500), default='https://i.ibb.co/Fnwd424/discord-icon.jpg')
    name = db.Column(db.String(50), nullable=False)
    banner = db.Column(db.String(500), default='https://images.pexels.com/videos/3045163/free-video-3045163.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500')

    #relationships
    # channels = db.relationship('Channel', back_populates='server')
    # owner = db.relationship('User', back_populates='dm_server')



#     <a href="https://ibb.co/g6TcZNZ"><img src="https://i.ibb.co/Fnwd424/discord-icon.jpg" alt="discord-icon" border="0"></a>
# <a href="https://ibb.co/ZN47LJp"><img src="https://i.ibb.co/fQ6L1Sz/color-discord-logo.png" alt="color-discord-logo" border="0"></a>
# <a href="https://ibb.co/MctF5hN"><img src="https://i.ibb.co/1rPFJn2/wavey-discord-logo.png" alt="wavey-discord-logo" border="0"></a>
# <a href="https://ibb.co/88p3Gt5"><img src="https://i.ibb.co/Sv8THGn/discord-reddit-icon.png" alt="discord-reddit-icon" border="0"></a>





    def to_dict(self):
        return {
            'id': self.id,
            'ownerId': self.ownerId,
            'name': self.name,
            'avatar': self.avatar,
            'banner': self.banner
        }
