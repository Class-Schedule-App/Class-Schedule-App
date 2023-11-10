"""empty message

Revision ID: e41bc8fc4abd
Revises: 3154774fa595
Create Date: 2023-11-09 16:40:32.575971

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e41bc8fc4abd'
down_revision = '3154774fa595'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('session_attendees',
    sa.Column('module_id', sa.Integer(), nullable=False),
    sa.Column('student_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['module_id'], ['sessions.id'], ),
    sa.ForeignKeyConstraint(['student_id'], ['students.id'], ),
    sa.PrimaryKeyConstraint('module_id', 'student_id')
    )
    op.drop_table('module_attendees')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('module_attendees',
    sa.Column('module_id', sa.INTEGER(), nullable=False),
    sa.Column('student_id', sa.INTEGER(), nullable=False),
    sa.ForeignKeyConstraint(['module_id'], ['modules.id'], ),
    sa.ForeignKeyConstraint(['student_id'], ['students.id'], ),
    sa.PrimaryKeyConstraint('module_id', 'student_id')
    )
    op.drop_table('session_attendees')
    # ### end Alembic commands ###
