"""empty message

Revision ID: 9faae12aeae0
Revises: ab08c1388366
Create Date: 2021-11-14 15:44:54.067489

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9faae12aeae0'
down_revision = 'ab08c1388366'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('dm_messages', sa.Column('username', sa.String(), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('dm_messages', 'username')
    # ### end Alembic commands ###
