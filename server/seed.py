#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app, bcrypt
from models import db, FoodReview, Food, Drink, DrinkReview, User

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        Food.query.delete()
        FoodReview.query.delete()
        Drink.query.delete()
        DrinkReview.query.delete()
        User.query.delete()

        print("Starting seed...")

        food1 = Food(name = 'Hama Chili', description = 'Ponzu, Thai Chili, Orange Supreme', price = 22.50, gluten_free = True, image = 'assets/HamaChili.png' )
        food2 = Food(name = 'Walu Walu', description = 'Yuzu, Myoga, Escolar', price = 19.50, gluten_free = True, image = 'assets/Walu.png')
        food3 = Food(name = 'Kinoko Nabe', description = 'Seasonal Mushrooms, Egg yolk, Koshihikari Rice', price = 21, gluten_free = False, image = 'assets/Nabe.png')

        db.session.add_all([food1, food2, food3])
        db.session.commit()

        password_1 = "kharbour"
        pw_hash_1 = bcrypt.generate_password_hash(password_1).decode('utf-8')

        password_2 = "winksdot"
        pw_hash_2 = bcrypt.generate_password_hash(password_2).decode('utf-8')

        

        user1 = User(email="kharbour22@gmail.com", username="kharbour", password_hash=pw_hash_1, type="admin")
        user2 = User(email="Dot@geocities.com", username="winksdot", password_hash=pw_hash_2, type="user")
        

        db.session.add_all([user1, user2])

        db.session.commit()

        drink1 = Drink(name = 'High Noon Old Fashioned', description = 'High West Bourbon, Barley Bitters, Lemon', price = 16.00, image = 'assets/Highnoon.png')
        drink2 = Drink(name = 'Fiery Yu', description = 'Yuzu Honey, Thai Chili, Lemon', price = 14.00, image = 'assets/Fiery.png')

        db.session.add_all([drink1, drink2])

        db.session.commit()

        foodreview1 = FoodReview(food_id = 1, user_id=3, rating = 5, text = 'Amazing combo of citrus and spice!')
        foodreview2 = FoodReview(food_id = 1, user_id = 2, rating = 5, text = '')

        db.session.add_all([foodreview1, foodreview2])

        db.session.commit()

        drinkreview1 = DrinkReview(drink_id =1, user_id = 3, rating = 5, text = 'Interesting twist on a classic cocktail.')
        drinkreview2 = DrinkReview(drink_id = 2, user_id = 2, rating = 4, text = 'Definetly the signature drink here.')

        db.session.add_all([drinkreview1, drinkreview2])

        db.session.commit()
        print("Completed seeding!")
