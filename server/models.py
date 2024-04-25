from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!
class Food(db.Model, SerializerMixin):
    __tablename__ = 'foods'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False)
    image = db.Column(db.String, nullable = True)
    description = db.Column(db.String, nullable = False)
    price = db.Column(db.Float, nullable = False)
    gluten_free = db.Column(db.Boolean, nullable = False)


class Drink(db.Model, SerializerMixin):
    __tablename__ = 'drinks'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False)
    image = db.Column(db.String, nullable = True)
    description = db.Column(db.String, nullable = False)
    price = db.Column(db.Float, nullable = False)

class DrinkReview(db.Model, SerializerMixin):
    __tablename__ = 'drinkreviews'

    id = db.Column(db.Integer, primary_key = True)
    rating = db.Column(db.Integer, nullable = False)
    text = db.Column(db.String, nullable = False)
    drink_id = db.Column(db.Integer, nullable = False)
    user_id = db.Column(db.Integer, nullable = False)


class FoodReview(db.Model, SerializerMixin):
    __tablename__ = 'foodreviews'

    id = db.Column(db.Integer, primary_key = True)
    rating = db.Column(db.Integer, nullable = False)
    text = db.Column(db.String, nullable = False)
    food_id = db.Column(db.Integer, nullable = False)
    user_id = db.Column(db.Integer, nullable = False)

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key = True)
    email = db.Column(db.String, nullable = False)
    username= db.Column(db.String, nullable = False)
    password_hash = db.Column(db.String, nullable = False)
    type = db.Column(db.String, nullable = False)



