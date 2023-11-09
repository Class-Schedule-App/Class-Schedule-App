"""initial migration

Revision ID: c198761daa81
Revises: 12a6303c8814
Create Date: 2023-11-09 07:21:23.044065

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'c198761daa81'
down_revision: Union[str, None] = '12a6303c8814'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
