from app.models import Channel, db

def seed_channels():
    channel1 = Channel(
        # id = 1,
        serverId=1,
        name='general'
    )
    channel2 = Channel(
        # id=2,
        serverId=2,
        name='general'
    )
    channel3 = Channel(
        # id = 3,
        serverId=1,
        name='Politics'
    )
    channel4 = Channel(
        # id=4,
        serverId=2,
        name='Multiplayer'
    )
    channel5 = Channel(
        # id=4,
        serverId=3,
        name='general'
    )


    db.session.add(channel1)
    db.session.add(channel2)
    db.session.add(channel3)
    db.session.add(channel4)
    db.session.add(channel5)

    for i in range(4, 26):
        db.session.add(Channel(name='general', serverId=i))
        db.session.commit()





    db.session.commit()

def undo_channels():
    db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')
    db.session.commit()
