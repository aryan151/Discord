from .db import db

class Message(db.Model):

    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(2000), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    channelId = db.Column(db.Integer, db.ForeignKey('channels.id'))
    imageUrl = db.Column(db.String(200), nullable=True)

    #Relationship

    channel = db.relationship('Channel', back_populates='messages')
    user = db.relationship('User', back_populates='messages')

    def to_dict(self):
        return {
            'id': self.id,
            'body': self.body,
            'userId': self.userId,
            'channelId': self.channelId,
            'imageUrl': self.imageUrl
        }
