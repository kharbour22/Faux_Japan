#!/usr/bin/env python3
import ipdb
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
    def post(self):
        try:
            new_food = Food(name = request.json.get('name'), image = request.json.get('image'), description = request.json.get('description'), price = request.json.get('price'), gluten_free = request.json.get('gluten_free'))
            db.session.add(new_food)
            db.session.commit()
            response_body = new_food.to_dict(only = ('id','name', 'image', 'description', 'price', 'gluten_free'))
            return make_response(response_body, 201)
        except:
            response_body = {
                'error':'A food must have a name, image, description, and price. Specify if gluten free.'
            }
            return make_response(response_body, 400)

    
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

    def patch(self, id):
        food = db.session.get(Food, id)

        if food:
            try:
                for attr in request.json:
                    setattr(food, attr, request.json[attr])

                db.session.commit()
                response_body = food.to_dict(only = ('id','name', 'image', 'description', 'price', 'gluten_free'))
                return make_response(response_body, 200)
                
            except:
                response_body = {
                    'error': 'Food must have a name, image, description, and price. Food cannot be the same as any other food and must be specified if gluten free.'
                }
                return make_response(response_body, 400)
        else:
            response_body = {
                'error': 'Food not found.'
            }
            return make_response(response_body, 404)
    
    def delete (self, id):
        food = db.session.get(Food, id)

        if food:
            db.session.delete(food)
            db.session.commit()
            response_body = {}
            return make_response(response_body, 204)
        else:
            response_body = {
                'error':'Food not found.'
            }
            return make_response(response_body, 404)
        
api.add_resource(FoodbyID, '/foods/<int:id>')

class AllDrinks(Resource):

    def get(self):
        response_body = [drink.to_dict(only = ('id', 'name', 'description', 'price','image'))for drink in Drink.query.all()]
        return make_response(response_body, 200)
    def post (self):
        try:
            new_drink = Drink(name = request.json.get('name'), image = request.json.get('image'), description = request.json.get('description'), price = request.json.get('price'))
            db.session.add(new_drink)
            db.session.commit()
            response_body = new_drink.to_dict(only = ('id', 'name', 'description', 'price', 'image'))
            return make_response(response_body,201)
        except:
            response_body = {
                'error':'A drink must have a name, description, image and price.'
            }
            return make_response(response_body, 400)
    
api.add_resource(AllDrinks, '/drinks')

class DrinkbyID(Resource):

    def get(self,id):
        drink = db.session.get(Drink, id)

        if drink:
            response_body = drink.to_dict(only = ('id', 'name', 'description', 'price','image'))

            return make_response(response_body, 200)
        else:
            response_body = {
                'error' : 'Drink not Found'
            }
            return make_response(response_body, 404)
    
    def patch (self, id):
        drink = db.session.get(Drink, id)

        if drink:
            try:
                for attr in request.json:
                    setattr(drink, attr, request.json[attr])
                db.session.commit()
                response_body = drink.to_dict(only = ('id', 'name', 'description', 'price', 'image'))
                return make_response(response_body, 200)
            except: 
                response_body = {
                    'error': ' Drink must have a name, description, image, price and cannot be the same name as any other drink. '
                }
                return make_response(response_body, 400)
        else:
            response_body = {
                'error':'Drink not found.'
            }
            return make_response(response_body, 404)
    
    def delete(self, id):
        drink = db.session.get(Drink, id)

        if drink:
            db.session.delete(drink)
            db.session.commit()
            response_body = {}
            return make_response(response_body, 204)
        else:
            response_body = {
                'error':'Drink not found.'
            }
            return make_response(response_body, 404)
        
api.add_resource(DrinkbyID, '/drinks/<int:id>')

class AllUsers(Resource):

    def get(self):
        users = User.query.all()
        user_list_with_dictionaries = [user.to_dict(only = ('id', 'email', 'username', 'type')) for user in users]
        return make_response(user_list_with_dictionaries, 200)
    def post(self):
        try:
            new_user = User(email = request.json.get('email'), username = request.json.get('username'), password_hash = request.json.get('password'), type = 'user')
            db.session.add(new_user)
            db.session.commit()
            response_body = new_user.to_dict(only = ('id', 'email', 'username', 'type'))
            return make_response(response_body, 201)
        except:
            response_body = {
                'error':'User must have an email, username, and password. Email and username must be longer than five characters.'
            }
            return make_response(response_body, 400)
    
api.add_resource(AllUsers, '/users')

class UserByID(Resource):

    def get (self, id):
        user = db.session.get(User, id)

        if user:
            response_body = user.to_dict(rules = ('-foodreviews.food', '-drinkreviews.drink', '-foodreviews.user', '-drinkreviews.user', '-password_hash'))
              # Add in the association proxy data (The user's reviews) while removing duplicate food data for the user's foods   
            response_body['foods'] = [food.to_dict(only =('id','name','image','description', 'price', 'gluten_free' )) for food in list(set(user.foods))]
            response_body['drinks'] = [drink.to_dict(only=('id', 'name', 'description', 'price')) for drink in list(set(user.drinks))]

            return make_response(response_body, 200)
        else:
            response_body = {
                'error':'User Not Found'
            
            }
            return make_response(response_body, 404)
    
    def patch(self, id):
        user = db.session.get(User, id)

        if user:
            try:
                for attr in request.json:
                    setattr(user, attr, request.json[attr])
                
                db.session.commit()
                response_body = user.to_dict(only=('id', 'email', 'username', 'type'))
                return make_response(response_body, 200)
            except:
                response_body = {
                    "error": "User must have an email, username, and password. Email and username must be longer than five characters."
                }
                return make_response(response_body, 400)
        
        else:
            response_body = {
                'error': "User Not Found"
            }
            return make_response(response_body, 404)
    
    def delete(self, id):
        user = db.session.get(User, id)

        if user:
            db.session.delete(user)
            db.session.commit()
            response_body = {}
            return make_response(response_body, 204)
        
        else:
            response_body = {
                'error': "User Not Found"
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

            
            response_body['foods'] = [food.to_dict(only =('id','name','image','description', 'price', 'gluten_free' )) for food in list(set(user.foods))]
            response_body['drinks'] = [drink.to_dict(only=('id', 'name', 'description', 'price')) for drink in list(set(user.drinks))]

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

          
            response_body['foods'] = [food.to_dict(only =('id','name','image','description', 'price', 'gluten_free' )) for food in list(set(user.foods))]
            response_body['drinks'] = [drink.to_dict(only = ('id', 'name','image', 'description', 'price')) for drink in list(set(user.drinks)) ]

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


class Signup(Resource):
    def post(self):
        try:
            password = request.json.get('password')
            pw_hash = bcrypt.generate_password_hash(password).decode('utf-8')
            new_user = User(email = request.json.get('email'), username = request.json.get('username'), password_hash = pw_hash, type = 'user') 
            db.session.add(new_user)
            db.session.commit()
            session['user_id'] = new_user.id

            response_body = new_user.to_dict(rules = ('-foodreviews.food','-drinkreviews.drink', '-foodreviews.user', '-drinkreviews.user', '-password_hash'))

            response_body['foods'] = [food.to_dict(only =('id','name','image','description', 'price', 'gluten_free' )) for food in list(set(new_user.foods))]
            response_body['drinks'] = [drink.to_dict(only = ('id', 'name','image', 'descrpition', 'price')) for drink in list(set(new_user.drinks)) ]

            return make_response(response_body, 201)
        except:
            response_body = {
                'error':'User must have an email, username, and password. Email and username must be longer than five characters.'
            }
            return make_response(response_body, 400)

api.add_resource(Signup, '/signup')


class AllFoodReviews(Resource):

    def get(self):
        foodreviews = FoodReview.query.all()
        foodreview_list_with_dictionaries = [foodreview.to_dict(only=('id','rating','text', 'food.name','user_id' ))for foodreview in foodreviews]
        return make_response(foodreview_list_with_dictionaries, 200)
    def post(self):
        try:
            # ipdb.set_trace()
            new_foodreview = FoodReview(rating = request.json.get('rating'), text = request.json.get('text'), food_id = request.json.get('food_id'), user_id=request.json.get('user_id') )
            db.session.add(new_foodreview)
            db.session.commit()
            response_body = new_foodreview.to_dict(only=('id','rating','text', 'food_id', 'user_id'))
            return make_response(response_body, 201)
        except: 
            response_body = {
                'error': 'Review must have a rating, text, and food_id.'
            }
            return make_response(response_body, 400)
            
    
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
    
    def delete(self, id):
        foodreview = db.session.query(FoodReview).get(id)

        if foodreview:
            db.session.delete(foodreview)
            db.session.commit()
            response_body = {}
            return make_response(response_body, 204)
        else:
            response_body = {
                'error': 'Food review not found.'
            }
            return make_response(response_body, 404)
        
api.add_resource(FoodReviewByID, '/foodreviews/<int:id>')

class AllDrinkReviews(Resource):

    def get(self):
        drinkreviews = DrinkReview.query.all()
        drink_review_list_with_dictionaries = [drinkreview.to_dict(only=('id',)) for drinkreview in drinkreviews]
        return make_response(drink_review_list_with_dictionaries, 200)
    def post(self):
        try:
            new_drinkreview = DrinkReview(rating=request.json.get('rating'), text=request.json.get('text'), user_id=request.json.get('user_id'), drink_id=request.json.get('drink_id'))
            db.session.add(new_drinkreview)
            db.session.commit()
            response_body = new_drinkreview.to_dict(rules=('-drink.drinkreviews', '-user.drinkreviews', '-user.password_hash'))
            return make_response(response_body, 201)
        except:
            response_body = {
                'error': 'Review must have a rating, text, user_id, and drink_id.'
            }
            return make_response(response_body, 400)

    
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
        
    def delete(self, id):
        drinkreview = db.session.query(DrinkReview).get(id)

        if drinkreview:
            db.session.delete(drinkreview)
            db.session.commit()
            response_body = {}
            return make_response(response_body, 204)
        else:
            response_body = {
                'error': 'Review not found.'
            }
            return make_response(response_body, 404)
        
api.add_resource(DrinkReviewByID, '/drinkreviews/<int:id>')


@app.route('/')
def index():
    return '<h1>Project Server</h1>'




if __name__ == '__main__':
    app.run(port=5555, debug=True)

