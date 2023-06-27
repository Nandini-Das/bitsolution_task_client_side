import {
    createBrowserRouter,

  } from "react-router-dom";

import Main from "../Layout/Main";
import Dashboard from "../Pages/Dashboard";
import AddProduct from "../Pages/AddProduct";

  
  export  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: "/dashboard",
            element:<Dashboard></Dashboard>,
        },
        {
            path: "/addProduct",
            element: <AddProduct></AddProduct>,
        },
      ]
    },
  ]);
 