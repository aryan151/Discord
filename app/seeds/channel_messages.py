from app.models import Message, db

def seed_messages():
  msg1 = Message(
    body = "Anybody catch the Packers game?",
    userId = 1,
    channelId = 1
  )
  msg2 = Message(
    body = "Do you like the new Vanguard zombies?",
    userId = 2,
    channelId = 2
  )
  msg3 = Message(
    body = "House passes $555 infrastructure bill",
    userId = 3,
    channelId = 3,
    imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmKJgzH4DXr8ctf46h4ygtkiKUsbnbxI8ZiA&usqp=CAU'
  )
  msg4 = Message(
    body = "Which is better Modern Warfare, ColdWar, or Vanguard?",
    userId = 1,
    channelId = 4
  )
  msg5 = Message(
    body = "Whose down to queue some ranked?",
    userId = 2,
    channelId = 5
  )
  msg6 = Message(
    body = "Yeah they lost",
    userId = 3,
    channelId = 1
  )
  msg7 = Message(
    body = "It's average.",
    userId = 2,
    channelId = 2
  )
  msg8 = Message(
    body = "Facebook renames company to Meta",
    userId = 1,
    channelId = 3,
    imageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdBM67OL8mgODyeZrZLLbMfaiWqvOj2_mo-A&usqp=CAU"
  )


  db.session.add(msg1)
  db.session.add(msg2)
  db.session.add(msg3)
  db.session.add(msg4)
  db.session.add(msg5)
  db.session.add(msg6)
  db.session.add(msg7)
  db.session.add(msg8)
  db.session.commit()


def undo_messages():
  db.session.execute('TRUNCATE messages RESTART IDENTITY CASCADE;')
  db.session.commit()
