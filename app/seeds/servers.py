from app.models import db, Server

def seed_servers():
    server1 = Server(
        id = 1,
        ownerId=1,
        name='Small Talk'
    )
    server2 = Server(
        id=2,
        ownerId=2,
        name='Call of Duty'
    )
    server3 = Server(
        id=3,
        ownerId=2,
        name='League of Legends'
    )

    db.session.add(server1)
    db.session.add(server2)
    db.session.add(server3)
    db.session.commit()

def undo_servers():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
