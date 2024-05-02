"""Add NOT NULL constraint to user_id

Revision ID: a8d033e08b1a
Revises: 39af8540bbbf
Create Date: 2024-05-01 15:08:05.261783

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a8d033e08b1a'
down_revision = '39af8540bbbf'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('drinkreviews', schema=None) as batch_op:
        batch_op.alter_column('text',
               existing_type=sa.VARCHAR(),
               nullable=True)
        batch_op.alter_column('drink_id',
               existing_type=sa.INTEGER(),
               nullable=True)
        batch_op.alter_column('user_id',
               existing_type=sa.INTEGER(),
               nullable=True)
        batch_op.create_foreign_key(batch_op.f('fk_drinkreviews_drink_id_drinks'), 'drinks', ['drink_id'], ['id'])
        batch_op.create_foreign_key(batch_op.f('fk_drinkreviews_user_id_users'), 'users', ['user_id'], ['id'])

    with op.batch_alter_table('drinks', schema=None) as batch_op:
        batch_op.alter_column('image',
               existing_type=sa.VARCHAR(),
               nullable=False)

    with op.batch_alter_table('foodreviews', schema=None) as batch_op:
        batch_op.alter_column('text',
               existing_type=sa.VARCHAR(),
               nullable=True)
        batch_op.alter_column('food_id',
               existing_type=sa.INTEGER(),
               nullable=True)
        batch_op.create_foreign_key(batch_op.f('fk_foodreviews_food_id_foods'), 'foods', ['food_id'], ['id'])
        batch_op.create_foreign_key(batch_op.f('fk_foodreviews_user_id_users'), 'users', ['user_id'], ['id'])

    with op.batch_alter_table('foods', schema=None) as batch_op:
        batch_op.alter_column('image',
               existing_type=sa.VARCHAR(),
               nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('foods', schema=None) as batch_op:
        batch_op.alter_column('image',
               existing_type=sa.VARCHAR(),
               nullable=True)

    with op.batch_alter_table('foodreviews', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_foodreviews_user_id_users'), type_='foreignkey')
        batch_op.drop_constraint(batch_op.f('fk_foodreviews_food_id_foods'), type_='foreignkey')
        batch_op.alter_column('food_id',
               existing_type=sa.INTEGER(),
               nullable=False)
        batch_op.alter_column('text',
               existing_type=sa.VARCHAR(),
               nullable=False)

    with op.batch_alter_table('drinks', schema=None) as batch_op:
        batch_op.alter_column('image',
               existing_type=sa.VARCHAR(),
               nullable=True)

    with op.batch_alter_table('drinkreviews', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_drinkreviews_user_id_users'), type_='foreignkey')
        batch_op.drop_constraint(batch_op.f('fk_drinkreviews_drink_id_drinks'), type_='foreignkey')
        batch_op.alter_column('user_id',
               existing_type=sa.INTEGER(),
               nullable=False)
        batch_op.alter_column('drink_id',
               existing_type=sa.INTEGER(),
               nullable=False)
        batch_op.alter_column('text',
               existing_type=sa.VARCHAR(),
               nullable=False)

    # ### end Alembic commands ###