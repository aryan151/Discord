from operator import and_, or_
from flask import Blueprint, jsonify, session, request, redirect
from app.models import Server, ServerMember, DMServer, db
from app.forms import ServerForm
from app.models.dm_server import DMServer

servers_routes = Blueprint('servers', __name__)

@servers_routes.route('/')
def get_servers():
    servers = Server.query.all()
    return {'servers': [server.to_dict() for server in servers]}

@servers_routes.route('/', methods = ['POST'])
def add_server():

    form = ServerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        server = Server(
            name = form.data['name'],
            ownerId=form.data['owner_id'],
        )

    # server = Server(name='fred', owner_id=1)
    db.session.add(server)
    db.session.flush()
    db.session.refresh(server)
    my_server = ServerMember(userId=form.data['owner_id'], serverId=server.id, admin=True)
    db.session.add(my_server)
    db.session.commit()
    return server.to_dict()

@servers_routes.route('/<int:id>')
def get_my_servers(id):
    servers = Server.query.join(ServerMember).filter(ServerMember.userId == id).all()
    # owned = Server.query.filter(Server.ownerId == id).all()
    return {'servers': [server.to_dict() for server in servers]}

@servers_routes.route('home')
def get_home_server(name):
    server = DMServer.query.filter(DMServer.name == name).one()

    return server.to_dict()
