import {
    createBrowserRouter,

  } from "react-router-dom";

import Main from "../Layout/Main";
import Dashboard from "../Pages/Dashboard";
import AddProduct from "../Pages/AddProduct";
import AllProduct from "../Pages/AllProduct";
import UpdateProduct from "../Pages/UpdateProduct";

  
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
        {
            path: "/addedProduct",
            element: <AllProduct></AllProduct>,
        },
        {
            path: "/updateProduct/:id",
            element: <UpdateProduct></UpdateProduct>,
            loader: ({params}) => fetch(`http://localhost:5000/addedProduct/${params.id}`),
        },
      ]
    },
  ]);
 