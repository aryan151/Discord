from .db import db

class Channel(db.Model):

    __tablename__ = 'channels'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(1024), nullable=False, default="A new channel in After Hours")
    serverId = db.Column(db.Integer, db.ForeignKey('servers.id'), nullable=False)

    #Relationships
    server = db.relationship('Server', back_populates='channels')
    messages = db.relationship('Message', back_populates='channel')

    def to_dict(self):

        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'serverId': self.serverId
        }
