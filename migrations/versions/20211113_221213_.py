"""empty message

Revision ID: ab08c1388366
Revises: 
Create Date: 2021-11-13 22:12:13.703584

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ab08c1388366'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('avatar', sa.String(length=2000), nullable=True),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('online', sa.Boolean(), nullable=True),
    sa.Column('went_offline', sa.String(length=200), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('dm_messages',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('body', sa.String(length=2000), nullable=False),
    sa.Column('senderId', sa.Integer(), nullable=False),
    sa.Column('dm_server_Id', sa.Integer(), nullable=False),
    sa.Column('imageUrl', sa.String(length=200), nullable=True),
    sa.Column('createdAt', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
    sa.ForeignKeyConstraint(['dm_server_Id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['senderId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('dm_servers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('ownerId', sa.Integer(), nullable=False),
    sa.Column('avatar', sa.String(length=500), nullable=True),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('banner', sa.String(length=500), nullable=True),
    sa.ForeignKeyConstraint(['ownerId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('servers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('ownerId', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('avatar', sa.String(length=1000), nullable=True),
    sa.Column('banner', sa.String(length=1000), nullable=True),
    sa.Column('tag', sa.String(length=50), nullable=True),
    sa.ForeignKeyConstraint(['ownerId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('channels',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('description', sa.String(length=1024), nullable=False),
    sa.Column('serverId', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['serverId'], ['servers.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('server_members',
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('serverId', sa.Integer(), nullable=False),
    sa.Column('admin', sa.Boolean(), nullable=False),
    sa.ForeignKeyConstraint(['serverId'], ['servers.id'], ),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('userId', 'serverId')
    )
    op.create_table('messages',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('body', sa.String(length=2000), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('channelId', sa.Integer(), nullable=True),
    sa.Column('imageUrl', sa.String(length=200), nullable=True),
    sa.ForeignKeyConstraint(['channelId'], ['channels.id'], ),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('messages')
    op.drop_table('server_members')
    op.drop_table('channels')
    op.drop_table('servers')
    op.drop_table('dm_servers')
    op.drop_table('dm_messages')
    op.drop_table('users')
    # ### end Alembic commands ###
