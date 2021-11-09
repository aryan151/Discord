"""empty message

Revision ID: d2f15d5f26c2
Revises: 
Create Date: 2021-11-09 13:57:37.652699

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd2f15d5f26c2'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('messages', sa.Column('createdAt', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True))
    op.add_column('messages', sa.Column('updatedAt', sa.DateTime(timezone=True), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('messages', 'updatedAt')
    op.drop_column('messages', 'createdAt')
    # ### end Alembic commands ###