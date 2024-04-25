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
  // useEffect(() => {
    
  //   fetch('/check_session')
  //   .then(response => {
  //       if(response.ok){
  //           response.json().then(userData => {
  //               setUser(userData)
  //           })
  //       }
  //       else if(response.status === 401){
  //           navigate('/login')
  //       }
  //   })
  // }, [])
  useEffect(() => {
    fetch('/foodreviews')
    .then(response => response.json())
    .then(foodReviewsData => setFoodreviews(foodReviewsData))
  }, [])
  useEffect(() => {
    fetch('/drinkreviews')
    .then(response => response.json())
    .then(drinkReviewsData => setDrinkreviews(drinkReviewsData))
  }, [])
  


  return (
    <div>
      <NavBar/>
      <Outlet context={{foods: foods}}/>
    </div>
  )
}

export default App;
