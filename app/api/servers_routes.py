from operator import and_, or_
from flask import Blueprint, jsonify, session, request, redirect
from app.models import Server, ServerMember, DMServer, Channel, db
from app.forms import ServerForm, EditServerForm
from app.models.dm_server import DMServer

servers_routes = Blueprint('servers', __name__)

@servers_routes.route('/explore/<int:id>')
def get_servers(id):
    servers= []
    servers_followed =  Server.query.join(ServerMember).filter(ServerMember.userId == id).all()
    server_ids = [server.to_dict()['id'] for server in servers_followed]
    all_servers = Server.query.all()
    all_servers_list = [server.to_dict() for server in all_servers]
    for i in all_servers_list:
        if i['id'] not in server_ids:
           servers.append(i)
    return {'servers': [*servers]}

    # servers = list(filter(lambda server: server.id not in server_ids, all_servers_list))
    # return {
    #     'servers': [*servers]
    # }



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
    general = Channel(name='general', serverId=server.id)
    db.session.add(general)
    db.session.commit()
    return server.to_dict()

@servers_routes.route('/<int:id>')
def get_my_servers(id):
    servers = Server.query.join(ServerMember).filter(ServerMember.userId == id).all()
    # owned = Server.query.filter(Server.ownerId == id).all()
    return {'servers': [server.to_dict() for server in servers]}

@servers_routes.route('home/<name>')
def get_home_server(name):
    server = DMServer.query.filter(DMServer.name == name).one()

    return server.to_dict()

@servers_routes.route('/<int:serverId>', methods=['POST'])
def edit_server(serverId):
    form = EditServerForm()
    server = Server.query.get(serverId)
    server.name = form.data['name']
    db.session.commit()
    return server.to_dict()

@servers_routes.route('/delete/<int:serverId>', methods=['DELETE'])
def delete_server(serverId):
    server = Server.query.get(serverId)
    db.session.delete(server)
    db.session.commit()
    return { 'id' : serverId}


@servers_routes.route('/remove/<int:serverId>/<int:userId>', methods=['DELETE'])
def remove_server(serverId, userId):
    server = ServerMember.query.filter(ServerMember.userId == userId, ServerMember.serverId == serverId).one()
    db.session.delete(server)
    db.session.commit()
    return { 'id' : serverId}
