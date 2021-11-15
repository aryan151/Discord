import random
from app.models import db, Server, DMServer, Channel
from coolname import generate_slug
from faker import Faker
from datetime import datetime, timedelta

fake = Faker()


def randomDate(min_year=2018, max_year=datetime.now().year):
    start = datetime(min_year, 1, 1, 00, 00, 00)
    years = max_year - min_year + 1
    end = start + timedelta(days=365 * years)
    return start + (end - start) * random.random()


def seed_servers():

    tags = ['Home','Gaming','Music','Videos','Tech','Sports']
    server1 = Server(
        ownerId=1,
        name='Small Talk',
        avatar=fake.image_url(),
        banner=fake.image_url(),
        tag=random.choice(tags),
        createdAt=randomDate()
    )
    server2 = Server(
        ownerId=2,
        name='Call of Duty',
        avatar=fake.image_url(),
        banner=fake.image_url(),
        tag=random.choice(tags),
        createdAt=randomDate()
    )
    server3 = Server(
        ownerId=2,
        name='League of Legends',
        avatar=fake.image_url(),
        banner=fake.image_url(),
        tag=random.choice(tags),
        createdAt=randomDate()
    )

    db.session.add(server1)
    db.session.add(server2)
    db.session.add(server3)



    for i in range(1, 30):
        db.session.add(Server(name=generate_slug()[0:20], ownerId=(i), avatar=fake.image_url(), banner=fake.image_url(), tag=random.choice(tags), createdAt=randomDate() ))
        db.session.commit()
    db.session.commit()


def undo_servers():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
