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


const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
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
                path:"drinks/:id",
                element: <DrinkProfile/>
            }
        ]

    }
])

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<RouterProvider router = {router} />);
