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

        food1 = Food(name = 'Hama Chili', description = 'Ponzu, Thai Chili, Orange Supreme', price = 22.50, gluten_free = True, image = '/assets/HamaChili.png', food_type = 'Cool' )
        food2 = Food(name = 'Walu Walu', description = 'Yuzu, Myoga, Escolar', price = 19.50, gluten_free = True, image = '/assets/Walu.png', food_type = 'Hot')
        food3 = Food(name = 'Kinoko Nabe', description = 'Seasonal Mushrooms, Egg yolk, Koshihikari Rice', price = 21, gluten_free = False, image = '/assets/Nabe.png', food_type = 'Hot')
        food4 = Food(name = 'Fried Milk', description = 'Vanilla Custard, Salted Fudge, Sweet Cream', price = 12.5, gluten_free = False, image = '/assets/Fried_Milk.png ', food_type = 'Dessert')
        food5 = Food(name = 'Hirame Usuzukuri', description = ' Flounder, Lime Zest, Candied Quinoa', price = 20, gluten_free = True, image = '/assets/Hirame.png ', food_type = 'Cool')
        food6 = Food(name = 'Oyster', description = 'Shiitake Mignonette', price = 5.5, gluten_free = False , image = '/assets/Oyster.png', food_type = 'Daily Specials')
        food12 = Food(name = 'Madai Crudo', description = 'Sea Bream, Pear, Shiro Zu', price = 27, gluten_free = False, image = '/assets/Madai_Crudo.png ', food_type = 'Daily Specials')
        food7 = Food(name = 'Hot Rock', description = 'A5 Wagyu, Ponzu', price = 50 , gluten_free = True, image = '/assets/Hot_Rock.png ', food_type = 'Hot')
        food8 = Food(name = 'Jasmine Cream', description = 'Cilantro Granita, Pineapple, Honey Crumble', price = 11, gluten_free = True, image = '/assets/Jasmine.png ', food_type = 'Dessert')
        food9 = Food(name = 'Karaage', description = 'Chicken Thigh, Sweet Chili, Pickle', price = 15, gluten_free = True, image = '/assets/Kaarage.png ', food_type = 'Hot')
        food10 = Food(name = 'Wagyu Tataki', description = 'Chimichurri, Brussels, Fried Egg Miso Foam', price = 33.5, gluten_free = False, image = '/assets/Wagyu.png ', food_type = 'Daily Specials')
        food11 = Food(name = 'Akami Crudo', description = 'Bigeye Tuna, Blood Orange, Pumpkin Seed Granola', price = 46, gluten_free = True, image = '/assets/Akami.png', food_type = 'Daily Specials')
        food13 = Food(name = 'Okashi', description = 'Blackberry, Sesame Crumble', price = 13.5, gluten_free = False, image = '/assets/Okashi.png', food_type = 'Dessert')
        food14 = Food(name = 'Machi Cure', description = 'Smoked Yellowtail, Yuca Chips, Golden Raisin', price = 23, gluten_free = True, image = '/assets/Machi.png', food_type = 'Cool')
        food15 = Food(name = 'Yokai Berry', description = 'Salmon, Kale, Yuzu Dashi', price = 20.5, gluten_free = True, image = '/assets/Yokai.png', food_type = 'Cool')


        db.session.add_all([food1, food2, food3, food5, food6, food7, food4, food8, food9, food10, food11, food12, food13, food14, food15])
        db.session.commit()

        password_1 = "kharbour"
        pw_hash_1 = bcrypt.generate_password_hash(password_1).decode('utf-8')

        password_2 = "winksdot"
        pw_hash_2 = bcrypt.generate_password_hash(password_2).decode('utf-8')

        

        user1 = User(email="kharbour22@gmail.com", username="kharbour", password_hash=pw_hash_1, type="admin")
        user2 = User(email="Dot@geocities.com", username="winksdot", password_hash=pw_hash_2, type="user")
        

        db.session.add_all([user1, user2])

        db.session.commit()

        drink1 = Drink(name = 'High Noon Old Fashioned', description = 'High West Bourbon, Barley Bitters, Lemon', price = 16.00, image = '/assets/Highnoon.png', drink_type = 'Cocktail')
        drink2 = Drink(name = 'Fiery Yu', description = 'Breckenridge Vodka, Yuzu Honey, Thai Chili', price = 14.00, image = '/assets/Fiery.png', drink_type = 'Cocktail')
        drink3 = Drink(name = 'Karai Tuna', description = 'Habenero Mezcal, Prickly Pear, Lime', price = 16, image = '/assets/Karai.png', drink_type = 'Cocktail' )
        drink4 = Drink(name = 'Gin and Tonic', description = 'Ki No Bi Gin, Yuzu Cordial, Lemon', price = 22, image = '/assets/GandT.png', drink_type = 'Cocktail' )
        drink5 = Drink(name = 'Tsurai', description = 'Arette Blanco, Passion Fruit, Aperol', price = 18, image = '/assets/Tsurai.png', drink_type = 'Cocktail' )
        drink6 = Drink(name = 'Otokoyama', description = 'Clean, Crisp, Dry', price = 80, image = '/assets/Sake1.png', drink_type = 'Sake' )
        drink7 = Drink(name = 'Sho Chiku Bai', description = 'Unfiltered, Elegant, Coconut', price = 24, image = '/assets/Sake2.png', drink_type = 'Sake' )
        drink8 = Drink(name = 'Wakatake', description = 'Smooth, Black Pepper, Spearmint', price = 140 , image = '/assets/sake3.png', drink_type = 'Sake' )
        drink9 = Drink(name = 'Kirinzan', description = 'Robust, Almond, Melon', price = 130, image = '/assets/Sake4.png', drink_type = 'Sake' )
        drink10 = Drink(name = 'Hitachino', description = 'Seasonal', price = 12, image = '/assets/Beer1.png', drink_type = 'Beer' )
        drink11 = Drink(name = 'Sapporo', description = 'Lager', price = 7, image = '/assets/Beer2.png', drink_type = 'Beer' )
        drink12 = Drink(name = 'Asahi', description = 'Super Dry', price = 8, image = '/assets/Beer3.png', drink_type = 'Beer' )
        drink13 = Drink(name = 'Gekkeikan', description = 'Hot, Floral', price = 12, image = '/assets/Sake5.png', drink_type = 'Sake')

        db.session.add_all([drink1, drink2, drink3, drink4, drink5, drink6, drink7, drink8, drink9, drink10, drink11, drink12, drink13])

        db.session.commit()

        foodreview1 = FoodReview(food_id = 1, user_id=2, rating = 5, text = 'Amazing combo of citrus and spice!')
        foodreview2 = FoodReview(food_id = 1, user_id = 2, rating = 5, text = '')
        foodreview3 = FoodReview(food_id = 1, user_id = 2, rating = 4, text = 'Little spicy but so good')
        foodreview4 = FoodReview(food_id = 3, user_id = 2, rating = 5, text = 'I hate mushrooms but i love this!')
        foodreview5 = FoodReview(food_id = 3, user_id = 2, rating = 3, text = 'Burnt')
        foodreview6 = FoodReview(food_id = 2, user_id = 2, rating = 2, text = 'Made me sick!')
        foodreview7 = FoodReview(food_id = 2, user_id = 2, rating = 5, text = 'Best.Fish.Ever.')
        foodreview8 = FoodReview(food_id = 7, user_id = 2, rating = 5, text = 'OMG!')
        foodreview9 = FoodReview(food_id = 4, user_id = 2, rating = 3, text = 'A little bland')
        foodreview10 = FoodReview(food_id = 4, user_id = 2, rating = 5, text = '')
        foodreview11 = FoodReview(food_id = 8, user_id = 2, rating = 4, text = 'Great gluten free option')
        foodreview12 = FoodReview(food_id = 6, user_id = 2, rating = 3, text = 'Small portion for the price')
        foodreview13 = FoodReview(food_id = 6, user_id = 2, rating = 4, text = '')
        foodreview14 = FoodReview(food_id = 6, user_id = 2, rating = 5, text = '')
        foodreview15 = FoodReview(food_id = 9, user_id = 2, rating = 5, text = 'A must get!')

        db.session.add_all([foodreview1, foodreview2, foodreview3, foodreview4, foodreview5, foodreview6, foodreview7, foodreview8, foodreview9, foodreview10, foodreview11, foodreview12, foodreview13, foodreview14, foodreview15])

        db.session.commit()

        drinkreview1 = DrinkReview(drink_id =1, user_id = 3, rating = 5, text = 'Interesting twist on a classic cocktail.')
        drinkreview2 = DrinkReview(drink_id = 2, user_id = 2, rating = 4, text = 'Definetly the signature drink here.')

        db.session.add_all([drinkreview1, drinkreview2])

        db.session.commit()
        print("Completed seeding!")
