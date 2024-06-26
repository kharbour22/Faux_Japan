import React from "react";
import App from "./components/App";
import "./index.css";
import { createRoot } from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import FoodList from "./components/FoodList";
import DrinkList from "./components/DrinkList";
import LoginForm from "./components/LoginForm";
import FoodProfile from "./components/FoodProfile";
import DrinkProfile from "./components/DrinkProfile";
import NewFoodForm from "./components/NewFoodForm";
import NewDrinkForm from "./components/NewDrinkForm";
import FoodReviewList from "./components/FoodReviewList";
import NewFoodReviewForm from "./components/NewFoodReviewForm";
import SignupForm from "./components/SignupForm";
import Home from "./components/Home"
import FoodListAdmin from "./components/FoodListAdmin";
import DrinkListAdmin from "./components/DrinkListAdmin";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/foods",
                element: <FoodList/>
            },
            {
                path: "/foods/:id",
                element: <FoodProfile/>
            },
            {
                path: "/drinks",
                element: <DrinkList/>
            },
            {
                path:"/drinks/:id",
                element: <DrinkProfile/>
            },
            {
                path:"/add_food",
                element: <NewFoodForm/>
            },
            {
                path: "/add_drink",
                element: <NewDrinkForm/>
            },
            {
                path: "/reviews",
                element: <FoodReviewList/>
            },
            {
                path: "/add_review",
                element: <NewFoodReviewForm/>
            },
            {
                path: "/login",
                element: <LoginForm/>
            },
            {
                path: "/signup",
                element: <SignupForm/>
            },
            {
                path: "/foodsadmin",
                element: <FoodListAdmin/>
            },
            {
                path: "/drinksadmin",
                element: <DrinkListAdmin/>
            }

        ]

    }
])

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<RouterProvider router = {router} />);
