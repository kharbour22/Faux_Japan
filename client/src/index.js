import React from "react";
import App from "./components/App";
import "./index.css";
import { createRoot } from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage/>

    }
])

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<RouterProvider router = {router} />);
