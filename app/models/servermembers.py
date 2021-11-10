from .db import db

class ServerMember(db.Model):
    __tablename__='server_members'

    userId = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True, nullable=False)
    serverId = db.Column(db.Integer, db.ForeignKey('servers.id'), primary_key=True, nullable=False)
    admin = db.Column(db.Boolean, nullable=False)

    #relationships

    users = db.relationship('User', back_populates='server_members')
    servers = db.relationship('Server', back_populates='server_members')


    def to_dict(self):
        return {
            # 'id': self.id,
            'userId': self.userId,
            'serverId': self.serverId,
            'admin': self.admin
            # 'createdAt': self.createdAt.strftime("%Y/%m/%d %H:%M:%S"),
            # 'updatedAt': self.updatedAt.strftime("%Y/%m/%d %H:%M:%S")
        }
