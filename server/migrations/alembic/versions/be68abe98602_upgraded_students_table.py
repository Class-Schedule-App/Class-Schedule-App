"""upgraded students table

Revision ID: be68abe98602
Revises: c5d3bca4fe4e
Create Date: 2023-11-09 05:17:43.616118

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'be68abe98602'
down_revision: Union[str, None] = 'c5d3bca4fe4e'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
