from .db import db

class Channel(db.Model):

    __tablename__ = 'channels'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False)
    description = db.Column(db.String(30), nullable=False)
    serverId = db.Column(db.Integer, db.ForeignKey('servers.id'), nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False) 
    updatedAt = db.Column(db.DateTime, nullable=False) 

    #Relationships 

    def to_dict(self):

        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'serverId': self.serverId,
            'createdAt': self.createdAt.strftime("%Y/%m/%d %H:%M:%S"),
            'updatedAt': self.updatedAt.strftime("%Y/%m/%d %H:%M:%S")
        }

