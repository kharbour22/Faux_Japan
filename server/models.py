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

    # foodreviews = db.relationship('FoodReview', back_populates = 'food')
    # users = association_proxy('foodreviews', 'user', creator = lambda u: FoodReview(user = u))


class Drink(db.Model, SerializerMixin):
    __tablename__ = 'drinks'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False)
    image = db.Column(db.String, nullable = True)
    description = db.Column(db.String, nullable = False)
    price = db.Column(db.Float, nullable = False)

    # drinkreviews = db.relationship('DrinkReview', back_populates = 'drink')
    # users = association_proxy('drinkreviews', 'user', creator = lambda u: DrinkReview(user = u))

class DrinkReview(db.Model, SerializerMixin):
    __tablename__ = 'drinkreviews'

    id = db.Column(db.Integer, primary_key = True)
    rating = db.Column(db.Integer, nullable = False)
    text = db.Column(db.String, nullable = False)

    drink_id = db.Column(db.Integer, db.ForeignKey('drinks.id') )
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    # drink = db.relationship('Drink', back_populates = 'drinkreviews')
    # user = db.relationship('User', back_populates = 'drinkreviews')


class FoodReview(db.Model, SerializerMixin):
    __tablename__ = 'foodreviews'

    id = db.Column(db.Integer, primary_key = True)
    rating = db.Column(db.Integer, nullable = False)
    text = db.Column(db.String, nullable = False)

    food_id = db.Column(db.Integer,db.ForeignKey('foods.id') )
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    # food = db.relationship('Food', back_populates = 'foodreviews')
    # user = db.relationship('User', back_populates = 'foodreviews')

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key = True)
    email = db.Column(db.String, nullable = False)
    username= db.Column(db.String, nullable = False)
    password_hash = db.Column(db.String, nullable = False)
    type = db.Column(db.String, nullable = False)

    # foodreviews = db.relationship('FoodReview', back_populates = 'user', cascade='all')
    # drinkreviews = db.relationship('DrinkReview', back_populates = 'user', cascade='all')

    # foods = association_proxy('foodreviews', 'food', creator = lambda f: FoodReview(food = f))
    # drinks = association_proxy('drinkreviews', 'drink', creator = lambda d: DrinkReview(drink = d))






