from .db import db
from sqlalchemy.sql import func

class Message(db.Model):

    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(2000), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    channelId = db.Column(db.Integer, db.ForeignKey('channels.id'))
    imageUrl = db.Column(db.String(200), nullable=True)
    createdAt = db.Column(db.DateTime(timezone=True), server_default=func.now())
    userName = db.Column(db.String(200), nullable=True)
    # updatedAt = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    #Relationship

    channel = db.relationship('Channel', back_populates='messages')
    user = db.relationship('User', back_populates='messages')

    def to_dict(self):
        return {
            'id': self.id,
            'body': self.body,
            'userId': self.userId,
            'channelId': self.channelId,
            'imageUrl': self.imageUrl,
            'createdAt': self.createdAt.strftime("%Y/%m/%d %H:%M:%S"),
            'userName' : self.userName
        }
