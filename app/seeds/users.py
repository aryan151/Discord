from app.models import db, User
from faker import Faker
fake = Faker()

# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', avatar="https://i.ibb.co/Sv8THGn/discord-reddit-icon.png", online=False)
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', avatar="https://i.ibb.co/fQ6L1Sz/color-discord-logo.png", online=False)
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', avatar="https://i.ibb.co/1rPFJn2/wavey-discord-logo.png", online=False)
    aaron = User(
        username="aaron", email='aaron@aa.io', password='password', avatar="https://i.ibb.co/C1tWZ1J/226-2261764-custom-discord-folder-icon-by-kingkongtails-transparent-discord-logo.jpg", online=False)
    jess = User(
        username="jess", email='jess@aa.io', password="password", avatar="https://i.ibb.co/rH3PGH2/61383af57925e3f689bb0c18d447e4ee.jpg", online=False)
    sara = User(
        username="sara", email='sara@aa.io', password="password", avatar="https://i.ibb.co/pJnrRcX/dalv-discordcustomicon.jpg", online=False)
    steve = User(
        username="steve", email='steve@aa.io', password="password", avatar="https://i.ibb.co/k0W7TGF/discord-colors.jpg", online=False)
    penny = User(
        username="penny", email='penny@aa.io', password="password", avatar="https://i.ibb.co/kMrwjq6/images.jpg", online=False)
    roger = User(
        username="roger", email='roger@aa.io', password="password", avatar="https://i.ibb.co/0YvYmfx/Retro-Purple-Discord-Pfp-grande.jpg", online=False)




#         <a href="https://ibb.co/8KBXpKz"><img src="https://i.ibb.co/C1tWZ1J/226-2261764-custom-discord-folder-icon-by-kingkongtails-transparent-discord-logo.jpg" alt="226-2261764-custom-discord-folder-icon-by-kingkongtails-transparent-discord-logo" border="0"></a>
# <a href="https://ibb.co/7KQcJKt"><img src="https://i.ibb.co/rH3PGH2/61383af57925e3f689bb0c18d447e4ee.jpg" alt="61383af57925e3f689bb0c18d447e4ee" border="0"></a>
# <a href="https://ibb.co/NZ7nm5Y"><img src="https://i.ibb.co/pJnrRcX/dalv-discordcustomicon.jpg" alt="dalv-discordcustomicon" border="0"></a>
# <a href="https://ibb.co/bL80V6n"><img src="https://i.ibb.co/k0W7TGF/discord-colors.jpg" alt="discord-colors" border="0"></a>
# <a href="https://ibb.co/WsdMZBp"><img src="https://i.ibb.co/kMrwjq6/images.jpg" alt="images" border="0"></a>
# <a href="https://ibb.co/kqvq5ht"><img src="https://i.ibb.co/0YvYmfx/Retro-Purple-Discord-Pfp-grande.jpg" alt="Retro-Purple-Discord-Pfp-grande" border="0"></a>

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(aaron)
    db.session.add(jess)
    db.session.add(sara)
    db.session.add(steve)
    db.session.add(penny)
    db.session.add(roger)

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
