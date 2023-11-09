"""revised sessions

Revision ID: d960e1be69f2
Revises: 34de9b8b335d
Create Date: 2023-11-09 06:17:26.328385

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'd960e1be69f2'
down_revision: Union[str, None] = '34de9b8b335d'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
