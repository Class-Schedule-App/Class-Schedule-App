"""updated sessions

Revision ID: 34de9b8b335d
Revises: be68abe98602
Create Date: 2023-11-09 05:58:13.293924

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '34de9b8b335d'
down_revision: Union[str, None] = 'be68abe98602'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
