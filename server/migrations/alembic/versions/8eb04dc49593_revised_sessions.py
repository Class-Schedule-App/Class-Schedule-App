"""revised sessions

Revision ID: 8eb04dc49593
Revises: d960e1be69f2
Create Date: 2023-11-09 06:26:21.825217

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '8eb04dc49593'
down_revision: Union[str, None] = 'd960e1be69f2'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
