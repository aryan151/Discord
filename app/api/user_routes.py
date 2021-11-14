from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User
# from sqlalchemy import in_

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('search/<term>')
def get_user(term):
    users = User.query.filter(User.username.ilike(f'%{term}%'))
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('dms/<users>')
def get_dm_users(users):
    ids = users.split('-')
    ids = [int(i) for i in ids]
    dmUsers = User.query.filter(User.id.in_(ids)).all()
    return {"users": [user.to_dict() for user in dmUsers]}
    pass
