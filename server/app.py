#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, session, Flask
from flask_restful import Resource
from flask_bcrypt import Bcrypt

# Local imports
from config import app, db, api
# Add your model imports
from models import Food, Drink, FoodReview, DrinkReview, User
bcrypt = Bcrypt(app)

# Views go here!
class AllFoods(Resource):

    def get(self):
        response_body = [food.to_dict(only = ('id','name','image','description', 'price', 'gluten_free' )) for food in Food.query.all()]
        return make_response(response_body, 200)
    
api.add_resource(AllFoods, '/foods')

class FoodbyID(Resource):

    def get(self, id):
        food = db.session.get(Food,id)

        if food:
            response_body = food.to_dict(rules = ('-foodreviews.food', '-foodreviews.user'))

            return make_response(response_body, 200)
        
        else:
            response_body = {
                'error' : 'Food Not Found'
            }
            return make_response(response_body, 404)
        
api.add_resource(FoodbyID, '/foods/<int:id>')

class AllDrinks(Resource):

    def get(self):
        response_body = [drink.to_dict(only = ('id', 'name', 'descrpition', 'price'))for drink in Drink.query.all()]
        return make_response(response_body, 200)
    
api.add_resource(AllDrinks, '/drinks')

class DrinkbyID(Resource):

    def get(self,id):
        drink = db.session.get(Drink, id)

        if drink:
            response_body = drink.to_dict(rules = ('-drinkreviews', 'drinkreviews.user'))

            return make_response(response_body, 200)
        else:
            response_body = {
                'error' : 'Drink not Found'
            }
            return make_response(response_body, 404)
        
api.add_resource(DrinkbyID, '/drinks/<int:id>')

class AllUsers(Resource):

    def get(self):
        users = User.query.all()
        user_list_with_dictionaries = [user.to_dict(only = ('id', 'email', 'username', 'type')) for user in users]
        return make_response(user_list_with_dictionaries, 200)
    
api.add_resource(AllUsers, '/users')

class UserByID(Resource):

    def get (self, id):
        user = db.session.get(User, id)

        if user:
            response_body = user.to_dict(rules = ('-foodreviews.food', '-drinkreviews.drink', '-foodreviews.user', '-drinkreviews.user', '-password_hash'))
              # Add in the association proxy data (The user's reviews) while removing duplicate food data for the user's foods   
            response_body['foods'] = [food.to_dict(only =('id','name','image','description', 'price', 'gluten_free' )) for food in list(set(user.foods))]
            response_body['drinks'] = [drink.to_dict(only = ('id', 'name', 'descrpition', 'price')) for drink in list(set(user.drinks)) ]

            return make_response(response_body, 200)
        else:
            response_body = {
                'error':'User Not Found'
            
            }
            return make_response(response_body, 404)

api.add_resource(UserByID, '/users/<int:id>')

class Login(Resource):

    def post(self):
        username = request.json.get('username')
        password = request.json.get('password')
        user = User.query.filter(User.username == username).first()

        if(user and bcrypt.check_password_hash(user.password_hash, password)):
            session['user_id'] = user.id
            response_body = user.to_dict(rules=('-foodreviews.food','-drinkreviews.drink', '-foodreviews.user','-drinkreviews.user', '-password_hash'))

            # Add in the association proxy data (The user's hotels) while removing duplicate hotel data for the user's hotels
            response_body['foods'] = [food.to_dict(only =('id','name','image','description', 'price', 'gluten_free' )) for food in list(set(user.foods))]
            response_body['drinks'] = [drink.to_dict(only = ('id', 'name', 'descrpition', 'price')) for drink in list(set(user.drinks)) ]

            return make_response(response_body, 201)
        else:
            response_body = {
                "error": "Invalid username or password!"
            }
            return make_response(response_body, 401)
    
api.add_resource(Login, '/login')

class CheckSession(Resource):

    def get(self):
        user = db.session.get(User, session.get('user_id'))

        if(user):
            response_body = user.to_dict(rules=('-foodreviews.food','-drinkreviews.drink', '-foodreviews.user','-drinkreviews.user', '-password_hash'))

            # Add in the association proxy data (The user's hotels) while removing duplicate hotel data for the user's hotels
            response_body['foods'] = [food.to_dict(only =('id','name','image','description', 'price', 'gluten_free' )) for food in list(set(user.foods))]
            response_body['drinks'] = [drink.to_dict(only = ('id', 'name', 'descrpition', 'price')) for drink in list(set(user.drinks)) ]

            return make_response(response_body, 200)
        else:
            response_body = {
                "error": "Please Log In!"
            }
            return make_response(response_body, 401)

api.add_resource(CheckSession, '/check_session')

class Logout(Resource):
    
    def delete(self):
        if(session.get('user_id')):
            del(session['user_id'])

        response_body = {}
        return make_response(response_body, 204)
    
api.add_resource(Logout, '/logout')


class AllFoodReviews(Resource):

    def get(self):
        foodreviews = FoodReview.query.all()
        foodreview_list_with_dictionaries = [foodreview.to_dict(rules = ('-food.foodreviews', '-user.foodreviews', '-user.password_hash'))for foodreview in foodreviews]
        return make_response(foodreview_list_with_dictionaries, 200)
    
api.add_resource(AllFoodReviews, '/foodreviews')

class FoodReviewByID(Resource):

    def get (self, id):
        foodreview = db.session.get(FoodReview, id)

        if foodreview:
            response_body = foodreview.to_dict(rules = ('-food.foodreviews', '-user.foodreviews', '-user.password_hash'))
            return make_response(response_body, 200)
        else:
            response_body = {
                'error': 'Review Not Found'
            }
            return make_response(response_body, 404)
        
api.add_resource(FoodReviewByID, '/foodreviews/<int:id>')

class AllDrinkReviews(Resource):

    def get(self):
        drinkreviews = DrinkReview.query.all()
        drink_review_list_with_dictionaries = [drinkreview.to_dict(rules=('-drink.drinkreviews', 'user.drinkreviews', '-user.password_hash')) for drinkreview in drinkreviews]
        return make_response(drink_review_list_with_dictionaries, 200)
    
api.add_resource(AllDrinkReviews, '/drinkreviews')

class DrinkReviewByID(Resource):

    def get(self, id):
        drinkreview = db.session.get(DrinkReview, id)

        if drinkreview:
            response_body = drinkreview.to_dict(rules=('-drink.drinkreviews', 'user.drinkreviews', '-user.password_hash'))
            return make_response(response_body, 200)
        else:
            response_body = {
                'error': 'Review Not Found'
            }
            return make_response(response_body, 404)
        
api.add_resource(DrinkReviewByID, '/drinkreviews/<int:id>')


@app.route('/')
def index():
    return '<h1>Project Server</h1>'




if __name__ == '__main__':
    app.run(port=5555, debug=True)

