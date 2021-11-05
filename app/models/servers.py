from .db import db

class Server(db.Model):   
    __tablename__ = 'servers'

    id = db.Column(db.Integer, primary_key=True)
    ownerId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    avatar = db.Column(db.String(500), default='https://cdn.discordapp.com/embed/avatars/0.png') 
    banner = db.Column(db.String(500), default='https://images.pexels.com/videos/3045163/free-video-3045163.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500') 
    createdAt = db.Column(db.DateTime, nullable=False) 
    updatedAt = db.Column(db.DateTime, nullable=False)

#relationships 


    def to_dict(self):
        return {
            'id': self.id,
            'ownerId': self.ownerId,
            'name': self.name,
            'avatar': self.avatar,
            'banner': self.banner,
            'createdAt': self.createdAt.strftime("%Y/%m/%d %H:%M:%S"),
            'updatedAt': self.updatedAt.strftime("%Y/%m/%d %H:%M:%S")
        }