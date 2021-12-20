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

    server7 = Server(
      ownerId=3,
      name='NFL',
      avatar="https://i.ibb.co/MMhRYsq/football.jpg",
      tag="Sports"
    )
    server8 = Server(
      ownerId=3,
      name='Fortnite',
      avatar="https://i.ibb.co/KG7bYjp/fortnite.jpg",
      tag="Gaming"
    )
    server9 = Server(
      ownerId=3,
      name='Dope kicks',
      avatar="https://i.ibb.co/wC6gQ41/kicks.jpg",
      tag="Home"
    )
    server10 = Server(
      ownerId=3,
      name="MLB",
      avatar="https://i.ibb.co/Dk019gD/ROMLB-1.jpg",
      tag="Sports"
    )
    server11 = Server(
      ownerId=3,
      name='Surfing',
      avatar="https://i.ibb.co/jWPqRTP/surfing-outdoors.jpg",
      tag="Sports"
    )
    server12 = Server(
      ownerId=3,
      name="Thrasher",
      avatar="https://i.ibb.co/s16Xn0W/thrasher.jpg",
      tag="Sports"
    )
    server13 = Server(
      ownerId=3,
      name="90's grunge",
      avatar="https://i.ibb.co/26HwgDj/vans.jpg",
      tag="Home"
    )
    server14= Server(
      ownerId=3,
      name="Python",
      avatar="https://i.ibb.co/Wxhw5Xj/1200px-Python-logo-notext-svg.png",
      tag="Tech",
    )
    server15= Server(
      ownerId=3,
      name="custom keyboards",
      avatar="https://i.ibb.co/CMQ07C4/keyboards-image.jpg",
      tag="Tech",
    )
    server16= Server(
      ownerId=3,
      name="nodejs",
      avatar="https://i.ibb.co/zQ7F6ZD/nodejs-45adbe594d.png",
      tag="Tech",
    )
    server17= Server(
      ownerId=3,
      name="React",
      avatar="https://i.ibb.co/8jdkzmW/react-logo.png",
      tag="Tech",
    )
    server18= Server(
      ownerId=3,
      name="The Beatles",
      avatar="https://i.ibb.co/NYgJL49/Beatles-ad-1965-just-the-beatles-crop.jpg",
      tag="Music",
    )
    server19= Server(
      ownerId=3,
      name="Daft Punk",
      avatar="https://i.ibb.co/Y3jpknx/Daft-punk.jpg",
      tag="Music",
    )
    server20= Server(
      ownerId=3,
      name="Synthwave",
      avatar="https://i.ibb.co/Byrc3Jb/synthwave.jpg",
      tag="Music",
    )
    server21 = Server(
      ownerId=3,
      name="Bayern Munich",
      avatar="https://i.ibb.co/mywGgmp/1200px-FC-Bayern-Mu-nchen-logo-2017-svg.png",
      tag="Sports",
    )
    server22 = Server(
      ownerId=3,
      name="Design",
      avatar="https://i.ibb.co/6vyz8hp/absolver.jpg",
      tag="Tech",
    )
    server23 = Server(
      ownerId=3,
      name="Lil Peep",
      avatar="https://i.ibb.co/6mGxnBF/lil-peep.jpg",
      tag="Music",
    )
    server24 = Server(
      ownerId=3,
      name="LCD Soundsystem",
      avatar="https://i.ibb.co/LtRfHr6/dance.jpg",
      tag="Music",
    )
    server25 = Server(
      ownerId=3,
      name="Caribou",
      avatar="https://i.ibb.co/G2RS9Hm/caribou.jpg",
      tag="Music",
    )
    server26 = Server(
      ownerId=3,
      name="Halo Infinite",
      avatar="https://i.ibb.co/jfTz9DW/halo-infinite-1279637.jpg",
      tag="Gaming",
    )
    server27 = Server(
      ownerId=3,
      name="Absolver",
      avatar="https://i.ibb.co/9cbXRjx/animation.jpg",
      tag="Gaming",
    )

    server28 = Server(
      ownerId=3,
      name="James Blake",
      avatar="https://i.ibb.co/kS2WcZ0/james-blake.jpg",
      tag="Music",
    )


# <a href="https://ibb.co/t8W4K33"><img src="https://i.ibb.co/f4P2FQQ/com-truise.jpg" alt="com-truise" border="0"></a>






    db.session.add(server1)
    db.session.add(server2)
    db.session.add(server3)
    db.session.add(server3)
    db.session.add(server4)
    db.session.add(server5)
    db.session.add(server6)
    db.session.add(server7)
    db.session.add(server8)
    db.session.add(server9)
    db.session.add(server10)
    db.session.add(server11)
    db.session.add(server12)
    db.session.add(server13)
    db.session.add(server14)
    db.session.add(server15)
    db.session.add(server16)
    db.session.add(server17)
    db.session.add(server18)
    db.session.add(server19)
    db.session.add(server20)
    db.session.add(server21)
    db.session.add(server22)
    db.session.add(server23)
    db.session.add(server24)
    db.session.add(server25)
    db.session.add(server26)
    db.session.add(server27)
    db.session.add(server28)

    db.session.commit()


def undo_servers():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
