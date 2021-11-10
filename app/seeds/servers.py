from app.models import db, Server, DMServer

def seed_servers():
    server1 = Server(
        ownerId=1,
        name='Small Talk'
    )
    server2 = Server(
        ownerId=2,
        name='Call of Duty'
    )
    server3 = Server(
        ownerId=2,
        name='League of Legends'
    )
    server4 = DMServer(
        ownerId=1,
        name='Demo'
    )
    server5 = DMServer(
        ownerId=2,
        name='marnie'
    )
    server6 = DMServer(
        ownerId=3,
        name='bobbie'
    )

    db.session.add(server1)
    db.session.add(server2)
    db.session.add(server3)
    db.session.add(server4)
    db.session.add(server5)
    db.session.add(server6)
    db.session.commit()

def undo_servers():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
