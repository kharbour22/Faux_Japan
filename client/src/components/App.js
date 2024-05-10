import React, { useEffect, useState } from "react";
import { Switch, Route, Outlet, useNavigate, Navigate } from "react-router-dom";
import NavBar from "./NavBar";


function App() {

  const [foods, setFoods] = useState([])
  const [foodReviews, setFoodreviews] = useState([])
  const [drinks, setDrinks] = useState([])
  const [drinkReviews, setDrinkreviews] = useState([])
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(()=> {
    fetch('/foods')
        .then(response => {
            if(response.ok){
                response.json().then(foodsData => setFoods(foodsData))
            }
        })
  }, [user])
  useEffect(()=> {
    fetch('/drinks')
        .then(response => {
            if(response.ok){
                response.json().then(drinksData => setDrinks(drinksData))
            }
        })
  }, [user])
  useEffect(() => {
    
    fetch('/check_session')
    .then(response => {
        if(response.ok){
            response.json().then(userData => {
                setUser(userData)
            })
        }
        else if(response.status === 401){
            
        }
    })
  }, [])
  useEffect(() => {
    fetch('/foodreviews')
    .then(response => response.json())
    .then(foodreviewsData => setFoodreviews(foodreviewsData))
  }, [])
  useEffect(() => {
    fetch('/drinkreviews')
    .then(response => response.json())
    .then(drinkreviewsData => setDrinkreviews(drinkreviewsData))
  }, [])

  function signUpUser(signupData) {
    return fetch('/signup', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(signupData)
    })
    .then(response => {
        return response.json().then(data => {
            if(response.ok) {
                setUser(data);
                navigate('/');
                return data;
            } else {
                
                throw new Error(`Error: ${data.error}`);
            }
        });
    })
    .catch(error => {
       
        alert(error.message);
    });
}


  
  function logInUser(loginData){
  
    fetch('/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(loginData)
    })
    .then(response => {
        if(response.ok){
            response.json().then(userData => {
                setUser(userData)
                navigate('/')
            })
        }
        else if(response.status === 401){
            response.json().then(errorData => alert(`Error: ${errorData.error}`))
        }
    })
  }
  
  function logOutUser(){
    
    fetch('/logout', {
        method: "DELETE"
    })
    .then(response => {
        if(response.ok){
            setUser(null)
            navigate('/')
        }
        else{
            alert("Error: Unable to log user out!")
        }
    })
  }


  function addFoodReview(newFoodReview){
    fetch('/foodreviews', {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            "Accept":"application/json"
        },
        body: JSON.stringify(newFoodReview)
    })
    .then(response => {
        if (response.ok){
            response.json().then(newFoodReviewData => {
                setFoodreviews([...foodReviews, newFoodReviewData]);  
                updateFoodWithNewRating(newFoodReviewData.food_id, newFoodReviewData.average_rating);  
            })
        }
        else{
            alert('Error: You must select a Food and Rating')
        }
    })
}

function updateFoodWithNewRating(foodId, newAverageRating) {
    setFoods(foods => foods.map(food => {
        if (food.id === foodId) {
            return {...food, average_rating: newAverageRating};  
        } else {
            return food;
        }
    }));
}



  function addFood(newFoodData){
    fetch('/foods', {
      method: "POST",
      headers:{
        "Content-Type":"application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(newFoodData)
    })
    .then(response => response.json())
    .then(newFoodData => setFoods([...foods, newFoodData]))
  }

  function addDrink(newDrinkData){
    fetch('/drinks', {
      method: "POST",
      headers: {
        "Content-Type":"application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(newDrinkData)
    })
    .then(response => response.json())
    .then(newDrinkData => setDrinks([...drinks, newDrinkData]))
  }

  function deleteFoodReview(id){

  fetch(`/foodreviews/${id}`, {
      method: "DELETE"
  })
  .then(response => {
    if(response.ok){
        setFoodreviews(foodReviews => foodReviews.filter(foodreview =>{
            return foodreview.id !== id
        }))
        navigate('/reviews')
    }
    else if(response.status === 404){
        response.json().then(errorData => alert(`Error: ${errorData.error}`))
    }
  })
}
  function deleteDrink(id){
    
    fetch(`/drinks/${id}`, {
        method: "DELETE"
    })
    .then(response => {
        if(response.ok){
            setDrinks(drinks => drinks.filter(drink => {
                return drink.id !== id
            }))
            navigate('/drinks')
        }
        else if(response.status === 404){
            response.json().then(errorData => alert(`Error: ${errorData.error}`))
        }
    })
}

  function deleteFood(id){
    
    fetch(`/foods/${id}`, {
        method: "DELETE"
    })
    .then(response => {
        if(response.ok){
            setFoods(foods => foods.filter(food => {
                return food.id !== id
            }))
            navigate('/foods')
        }
        else if(response.status === 404){
            response.json().then(errorData => alert(`Error: ${errorData.error}`))
        }
    })
}

  function updateDrink(id, drinkDataForUpdate, setDrinkFromDrinkProfile){
    
    fetch(`/drinks/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(drinkDataForUpdate)
    })
    .then(response => {
        if(response.ok){
            response.json().then(updatedDrinkData => {
                setDrinkFromDrinkProfile(updatedDrinkData)
                setDrinks(drinks => drinks.map(drink => {
                    if(drink.id === updatedDrinkData.id){
                        return updatedDrinkData
                    }
                    else{
                        return drink
                    }
                }))
            })
        }
        else if(response.status === 400 || response.status === 404){
            response.json().then(errorData => {
                alert(`Error: ${errorData.error}`)
            })
        }
        else{
            response.json().then(() => {
                alert("Error: Something went wrong.")
            })
        }
    })
}

  function updateFood(id, foodDataForUpdate, setFoodFromFoodProfile){
    
    fetch(`/foods/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(foodDataForUpdate)
    })
    .then(response => {
        if(response.ok){
            response.json().then(updatedFoodData => {
                setFoodFromFoodProfile(updatedFoodData)
                setFoods(foods => foods.map(food => {
                    if(food.id === updatedFoodData.id){
                        return updatedFoodData
                    }
                    else{
                        return food
                    }
                }))
            })
        }
        else if(response.status === 400 || response.status === 404){
            response.json().then(errorData => {
                alert(`Error: ${errorData.error}`)
            })
        }
        else{
            response.json().then(() => {
                alert("Error: Something went wrong.")
            })
        }
    })
}
  


  return (
    <div>
      <NavBar user = {user} logOutUser = {logOutUser}/>
      <Outlet context={{foods: foods, drinks: drinks, updateFood: updateFood, updateDrink: updateDrink, deleteFood: deleteFood, deleteDrink: deleteDrink, addFood: addFood, addDrink:addDrink, addFoodReview: addFoodReview, foodReviews: foodReviews, logInUser: logInUser, signUpUser: signUpUser, user: user, deleteFoodReview: deleteFoodReview }}/>
    </div>
  )
}

export default App;
