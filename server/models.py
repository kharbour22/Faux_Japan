from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates

from config import db
import re

# Models go here!
class Food(db.Model, SerializerMixin):
    __tablename__ = 'foods'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False)
    image = db.Column(db.String, nullable = False)
    description = db.Column(db.String, nullable = False)
    price = db.Column(db.Float, nullable = False)
    gluten_free = db.Column(db.Boolean, nullable = False)
    food_type = db.Column(db.String, nullable = True)

    foodreviews = db.relationship('FoodReview', back_populates = 'food', cascade = 'all')
    users = association_proxy('foodreviews', 'user', creator = lambda u: FoodReview(user = u))

    # @validates('name', 'image', 'description')
    # def validate_run(self, attr, value):
    #     if (not isinstance(value, str)) or (len(value) == 0):
    #         raise ValueError(f'Food must have a {attr}  ')
    #     else:
    #         return value
    # @validates('price')
    # def validate_price(self, key, price):
    #     if not isinstance(price, float):
    #         raise ValueError("Price must be a valid float value.")
    #     else:
    #         return price
        
class Drink(db.Model, SerializerMixin):
    __tablename__ = 'drinks'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False)
    image = db.Column(db.String, nullable = False)
    description = db.Column(db.String, nullable = False)
    price = db.Column(db.Float, nullable = False)
    drink_type = db.Column(db.String, nullable = False)

    drinkreviews = db.relationship('DrinkReview', back_populates = 'drink', cascade = 'all')
    users = association_proxy('drinkreviews', 'user', creator = lambda u: DrinkReview(user = u))

    # @validates('name', 'image', 'description')
    # def validate_run(self, attr, value):
    #     if (not isinstance(value, str)) or (len(value) == 0):
    #         raise ValueError(f'Drink must have a {attr}  ')
    #     else:
    #         return value
        
    # @validates('price')
    # def validate_price(self, key, price):
    #     if not isinstance(price, float):
    #         raise ValueError("Price must be a valid float value.")
    #     else:
    #         return price
        
class DrinkReview(db.Model, SerializerMixin):
    __tablename__ = 'drinkreviews'

    id = db.Column(db.Integer, primary_key = True)
    rating = db.Column(db.Integer, nullable = False)
    text = db.Column(db.String, nullable = True)

    drink_id = db.Column(db.Integer, db.ForeignKey('drinks.id') )
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    drink = db.relationship('Drink', back_populates = 'drinkreviews')
    user = db.relationship('User', back_populates = 'drinkreviews')

    # @validates('rating')
    # def validate_rating(self, key, rating):
    #     if rating is None:
    #         raise ValueError("Rating is required.")
    #     if not (1 <= rating <= 5):
    #         raise ValueError("Rating must be between 1 and 5.")
    #     return rating
    
    # @validates('drink_id')
    # def validate_drink_id(self, key, drink_id):
    #     if drink_id is None:
    #         raise ValueError("You must select a drink.")
    #     return drink_id
    

class FoodReview(db.Model, SerializerMixin):
    __tablename__ = 'foodreviews'

    id = db.Column(db.Integer, primary_key = True)
    rating = db.Column(db.Integer, nullable = False)
    text = db.Column(db.String, nullable = False)

    food_id = db.Column(db.Integer,db.ForeignKey('foods.id') )
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    food = db.relationship('Food', back_populates = 'foodreviews')
    user = db.relationship('User', back_populates = 'foodreviews')

    @validates('rating')
    def validate_rating(self, key, rating):
        if rating is None:
            raise ValueError("Rating is required.")
        if not (1 <= rating <= 5):
            raise ValueError("Rating must be between 1 and 5.")
        return rating
    
    # @validates('food_id')
    # def validate_food_id(self, key, food_id):
    #     if food_id is None:
    #         raise ValueError("You must select a food item")
    #     return food_id
    
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key = True)
    email = db.Column(db.String, nullable = False)
    username= db.Column(db.String, nullable = False)
    password_hash = db.Column(db.String, nullable = False)
    type = db.Column(db.String, nullable = False)

    foodreviews = db.relationship('FoodReview', back_populates = 'user', cascade='all')
    drinkreviews = db.relationship('DrinkReview', back_populates = 'user', cascade='all')

    foods = association_proxy('foodreviews', 'food', creator = lambda f: FoodReview(food = f))
    drinks = association_proxy('drinkreviews', 'drink', creator = lambda d: DrinkReview(drink = d))


    @validates('username', 'password_hash')
    def validate_length(self, attr, value):
        if len(value) < 5:
            raise ValueError(f"{attr} must be at least 5 characters long.")
        return value

    @validates('email')
    def validate_email(self, key, address):
        if not re.match(r"[^@]+@[^@]+\.[^@]+", address):
            raise ValueError(f"Invalid email address: {address}")
        return address

