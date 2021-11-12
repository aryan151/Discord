from app.models import db, Server, DMServer
from coolname import generate_slug
from faker import Faker
import random

fake = Faker()
def seed_servers():

    tags = ['Home','Gaming','Music','Videos','Tech','Sports']
    server1 = Server(
        ownerId=1,
        name='Small Talk',
        avatar=fake.image_url(),
        banner=fake.image_url(),
        tag=random.choice(tags)
    )
    server2 = Server(
        ownerId=2,
        name='Call of Duty',
        avatar=fake.image_url(),
        banner=fake.image_url(),
        tag=random.choice(tags)
    )
    server3 = Server(
        ownerId=2,
        name='League of Legends',
        avatar=fake.image_url(),
        banner=fake.image_url(),
        tag=random.choice(tags)
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

    for i in range(1, 25):
        db.session.add(Server(name=generate_slug()[0:20], ownerId=(i), avatar=fake.image_url(), banner=fake.image_url(), tag=random.choice(tags)))
        db.session.commit()
    db.session.commit()


def undo_servers():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
