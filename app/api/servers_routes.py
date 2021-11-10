from flask import Blueprint, jsonify, session, request, redirect
from app.models import Server, ServerMember, db
from app.forms import ServerForm

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
            ownerId=form.data['owner_id']
        )

    # server = Server(name='fred', owner_id=1)
    db.session.add(server)
    db.session.commit()
    return server.to_dict()

@servers_routes.route('/<int:id>')
def get_my_servers(id):
    servers = Server.query.join(ServerMember).filter(ServerMember.userId == id).all()
    return {'servers': [server.to_dict() for server in servers]}
