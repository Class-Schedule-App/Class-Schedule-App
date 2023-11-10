"""Resolved Relationships

Revision ID: 5f9e5b4dff45
Revises: 
Create Date: 2023-10-28 22:11:51.318030

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5f9e5b4dff45'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=100), nullable=True),
    sa.Column('email', sa.String(length=200), nullable=True),
    sa.Column('phone_number', sa.Integer(), nullable=True),
    sa.Column('password', sa.String(length=80), nullable=True),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('user_type', sa.String(length=200), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('technical_mentors',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('email', sa.String(), nullable=True),
    sa.Column('profile_img', sa.String(), nullable=True),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('tm_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['tm_id'], ['users.id'], name='fk_tm_id'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('students',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('email', sa.String(), nullable=True),
    sa.Column('profile_img', sa.String(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('student_id', sa.Integer(), nullable=True),
    sa.Column('tm_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['student_id'], ['users.id'], name='fk_student_id'),
    sa.ForeignKeyConstraint(['tm_id'], ['technical_mentors.id'], name='fk_tm_id'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('modules',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('module_name', sa.String(), nullable=True),
    sa.Column('date', sa.String(), nullable=True),
    sa.Column('time', sa.String(), nullable=True),
    sa.Column('invite_link', sa.String(), nullable=True),
    sa.Column('student_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['student_id'], ['students.id'], name='fk_student_id'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('Association_Module_TechnicalMentor',
    sa.Column('module_id', sa.Integer(), nullable=True),
    sa.Column('tm_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['module_id'], ['modules.id'], name='fk_module_id'),
    sa.ForeignKeyConstraint(['tm_id'], ['technical_mentors.id'], name='fk_tm_id')
    )
    op.create_table('sessions',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=200), nullable=True),
    sa.Column('announcements', sa.String(), nullable=True),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('module_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['module_id'], ['modules.id'], name='fk_module_id'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('Association_Student_Session',
    sa.Column('student_id', sa.Integer(), nullable=True),
    sa.Column('session_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['session_id'], ['sessions.id'], name='fk_session_id'),
    sa.ForeignKeyConstraint(['student_id'], ['students.id'], name='fk_student_id')
    )
    op.create_table('comments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('comment', sa.String(), nullable=True),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('student_id', sa.Integer(), nullable=True),
    sa.Column('session_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['session_id'], ['sessions.id'], name='fk_session_id'),
    sa.ForeignKeyConstraint(['student_id'], ['students.id'], name='fk_student_id'),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('comments')
    op.drop_table('Association_Student_Session')
    op.drop_table('sessions')
    op.drop_table('Association_Module_TechnicalMentor')
    op.drop_table('modules')
    op.drop_table('students')
    op.drop_table('technical_mentors')
    op.drop_table('users')
    # ### end Alembic commands ###
