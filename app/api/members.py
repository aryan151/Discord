from flask import Blueprint, jsonify, session, request, redirect
from app.models import ServerMember, db, User
from app.forms import MemberForm
  
members_routes = Blueprint('members', __name__)

@members_routes.route('/<int:serverId>') 
def get_members(serverId):
    members = User.query.join(ServerMember).filter(ServerMember.serverId == serverId).all()
    print('RIGHT HEREEEE', members)
    return {'members': [member.to_dict() for member in members]}


@members_routes.route('/', methods=['POST'])
def createMember():
    form = MemberForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        member = ServerMember(
            serverId = form.data['serverId'],
            userId = form.data['userId'],
            admin = form.data['admin']
        )
    # serverId = form.data['serverId']
    db.session.add(member)
    db.session.commit()
    return member.to_dict()
