# Sakanamono Restaurant


## Introduction

Sakanamono is a application designed to provide users with the ability to leave reviews on specific food items on the menu. In addition it allows the admin to add new food and drink items to the menu as well as update and delete the menu items. If youre not logged in as either you can still browse the menu and see whats available!

## Features

1. Food and Drink Menu

  - Users can view a list of food and drink items available at Sakanamono. They can toggle the food menu to only display gluten free items aswell!

2. Review

  - Users can add reviews on menu items and share their feedback with other patrons

3. Admin Capabilities

  - The Admin can create new menu items and update or delete existing items to keep things seasonal.

## Installation

1. Clone the repository:

  ```bash

  git clone git@github.com:kharbour22/Phase-5-Sakanamono.git

  cd Phase-5-Sakanamono

  ```

2. Install dependencies:

  ```bash

  pipenv install

  pip install flask-bcrypt

  pipenv shell

  ```

3. Start the Backend:

  ```bash

  cd server

  flask db upgrade

  python seed.py

  python app.py
  ```
4. Start the Frontend:

  In a seperate terminal

  ```
  pipenv shell
  
  cd client

  npm install

  npm start

  ```

## Usage

1. To use admin abilities log in as kharbour with the password kharbour. The Navbar will show you the options available.
2. To add review, use the signup feature and create an account. Once logged in the add review option will appear on the Navbar.

## Routes
- Home
- Foods
- Drinks
- Reviews
- Login
- Signup

(As a User)

- Home
- Foods
- Drinks
- Reviews
- Add Reviews
- Logout

(As a admin)

- Home
- Foods
- Drinks
- Add Food
- FoodsAdmin (to update or delete)
- Add Drink
- DrinksAdmin (to update or delete)
- Reviews
- Logout


  

  




