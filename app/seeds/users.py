from app.models import db, User
from faker import Faker
fake = Faker()

# Adds a demo user, you can add other users here if you want
def seed_users():
    Demo = User(
        username='Demo', email='demo@aa.io', password='password', avatar="https://i.ibb.co/Sv8THGn/discord-reddit-icon.png", online=False)
    Demo2 = User(
        username='marnie', email='marnie@aa.io', password='password', avatar="https://i.ibb.co/fQ6L1Sz/color-discord-logo.png", online=False)
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', avatar="https://i.ibb.co/1rPFJn2/wavey-discord-logo.png", online=False)
    aaron = User(
        username="aaron", email='aaron@aa.io', password='password', avatar="https://i.ibb.co/C1tWZ1J/226-2261764-custom-discord-folder-icon-by-kingkongtails-transparent-discord-logo.jpg", online=False)
    jess = User(
        username="jess", email='jess@aa.io', password="password", avatar="https://i.ibb.co/rH3PGH2/61383af57925e3f689bb0c18d447e4ee.jpg", online=False)
    sara = User(
        username="sara", email='sara@aa.io', password="password", avatar="https://i.ibb.co/pJnrRcX/dalv-discordcustomicon.jpg", online=False)
    steven = User(
        username="steve", email='steve@aa.io', password="password", avatar="https://i.ibb.co/k0W7TGF/discord-colors.jpg", online=False)
    penny = User(
        username="penny", email='penny@aa.io', password="password", avatar="https://i.ibb.co/kMrwjq6/images.jpg", online=False)
    roger = User(
        username="roger", email='roger@aa.io', password="password", avatar="https://i.ibb.co/0YvYmfx/Retro-Purple-Discord-Pfp-grande.jpg", online=False)
    rob = User(
        username="rob", email='rob@aa.io', password="password", avatar="https://i.ibb.co/WDRXBMS/7c4b66d2ef79c2073e8301cf537ac1ea.jpg" , online=False)
    jennifer = User(
        username="jenny", email='jenny@aa.io', password="password", avatar= "https://i.ibb.co/Z8QJjMz/96l-Bx-V5-I81e-E8-OGbri-T9f-Xk-BPGYXy-Qt-oe-TIv-NU6-Gc.jpg", online=False)
    ben = User(
        username="ben", email='ben@aa.io', password="password", avatar="https://i.ibb.co/6myJkLk/1518747-skeleben-discord-profile-pic.jpg" , online=False)
    elliot = User(
        username="elliot", email='elliot@aa.io', password="password", avatar="https://i.ibb.co/gwG3ZBw/discord-profile-picture-by-smashingbrand-dc2ghq0-pre.jpg", online=False)
    gaby = User(
        username="gaby", email='gaby@aa.io', password="password", avatar="https://i.ibb.co/jvstnY0/draw-avatar-for-your-discord-or-twitter-etc-profile-pic.jpg" , online=False)
    peter = User(
        username="peter", email='peter@aa.io', password="password", avatar="https://i.ibb.co/vLJwrTV/il-570x-N-3336302723-i2sx.jpg", online=False)
    hannah = User(
        username="hannah", email='rose@aa.io', password="password", avatar="https://i.ibb.co/RHJLGNx/images-1.jpg", online=False)
    nick = User(
        username="nick", email='nick@aa.io', password="password", avatar="https://i.ibb.co/xYp70Fw/images.png", online=False)





#         <a href="https://ibb.co/7g0DrZ7"><img src="https://i.ibb.co/WDRXBMS/7c4b66d2ef79c2073e8301cf537ac1ea.jpg" alt="7c4b66d2ef79c2073e8301cf537ac1ea" border="0"></a>
# <a href="https://ibb.co/6PKZMW0"><img src="https://i.ibb.co/Z8QJjMz/96l-Bx-V5-I81e-E8-OGbri-T9f-Xk-BPGYXy-Qt-oe-TIv-NU6-Gc.jpg" alt="96l-Bx-V5-I81e-E8-OGbri-T9f-Xk-BPGYXy-Qt-oe-TIv-NU6-Gc" border="0"></a>
# <a href="https://ibb.co/47FgH3H"><img src="https://i.ibb.co/6myJkLk/1518747-skeleben-discord-profile-pic.jpg" alt="1518747-skeleben-discord-profile-pic" border="0"></a>
# <a href="https://ibb.co/82J0gS2"><img src="https://i.ibb.co/gwG3ZBw/discord-profile-picture-by-smashingbrand-dc2ghq0-pre.jpg" alt="discord-profile-picture-by-smashingbrand-dc2ghq0-pre" border="0"></a>
# <a href="https://ibb.co/bgDtcVw"><img src="https://i.ibb.co/jvstnY0/draw-avatar-for-your-discord-or-twitter-etc-profile-pic.jpg" alt="draw-avatar-for-your-discord-or-twitter-etc-profile-pic" border="0"></a>
# <a href="https://ibb.co/TPHvn7Y"><img src="https://i.ibb.co/vLJwrTV/il-570x-N-3336302723-i2sx.jpg" alt="il-570x-N-3336302723-i2sx" border="0"></a>
# <a href="https://ibb.co/nkKhqBH"><img src="https://i.ibb.co/RHJLGNx/images-1.jpg" alt="images-1" border="0"></a>
# <a href="https://ibb.co/1MDm5zB"><img src="https://i.ibb.co/xYp70Fw/images.png" alt="images" border="0"></a>





    db.session.add(Demo)
    db.session.add(Demo2)
    db.session.add(bobbie)
    db.session.add(aaron)
    db.session.add(jess)
    db.session.add(sara)
    db.session.add(steven)
    db.session.add(penny)
    db.session.add(roger)
    db.session.add(rob)
    db.session.add(jennifer)
    db.session.add(ben)
    db.session.add(elliot)
    db.session.add(gaby)
    db.session.add(peter)
    db.session.add(hannah)
    db.session.add(nick)

    # for i in range(1, 30):
    #     j = False
    #     if (i % 2 == 0): j = True
    #     db.session.add(User(username=fake.name(), email=fake.ascii_email(), avatar=fake.image_url(), password='password', online=j))

    db.session.commit()

    # "https://i.ibb.co/fQ6L1Sz/color-discord-logo.png" alt="color-discord-logo" border="0"></a>
# <a href="https://ibb.co/MctF5hN"><img src="https://i.ibb.co/1rPFJn2/wavey-discord-logo.png"


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
