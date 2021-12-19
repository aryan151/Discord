# import random
from app.models import db, Server, DMServer, Channel
# from coolname import generate_slug
# from faker import Faker
# from datetime import datetime, timedelta

# fake = Faker()


# def randomDate(min_year=2018, max_year=datetime.now().year):
#     start = datetime(min_year, 1, 1, 00, 00, 00)
#     years = max_year - min_year + 1
#     end = start + timedelta(days=365 * years)
#     return start + (end - start) * random.random()


def seed_servers():

    # tags = ['Home','Gaming','Music','Videos','Tech','Sports']
    server1 = Server(
        ownerId=1,
        name='Small Talk',
        avatar="https://i.ibb.co/9NptWN1/small-talk-logo.png",
        # banner=fake.image_url(),
        tag="Home",
        # createdAt=randomDate()
    )
    server2 = Server(
        ownerId=2,
        name='Call of Duty',
        avatar="https://i.ibb.co/1mjQr7b/COD-logo.jpg",
        # banner=fake.image_url(),
        tag='Gaming',
        # createdAt=randomDate()
    )
    server3 = Server(
        ownerId=2,
        name='League of Legends',
        avatar="https://i.ibb.co/8M04k9n/leagueoflegends.jpg",
        # banner=fake.image_url(),
        tag='Gaming',
        # createdAt=randomDate()
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

#     <a href="https://ibb.co/87tsrNX"><img src="https://i.ibb.co/1mjQr7b/COD-logo.jpg" alt="COD-logo" border="0"></a>
# <a href="https://ibb.co/hsy10Vx"><img src="https://i.ibb.co/8M04k9n/leagueoflegends.jpg" alt="leagueoflegends" border="0"></a>
# <a href="https://ibb.co/2yFNdyC"><img src="https://i.ibb.co/9NptWN1/small-talk-logo.png" alt="small-talk-logo" border="0"></a>

    db.session.add(server1)
    db.session.add(server2)
    db.session.add(server3)
    db.session.add(server3)
    db.session.add(server4)
    db.session.add(server5)
    db.session.add(server6)

    db.session.commit()


def undo_servers():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
