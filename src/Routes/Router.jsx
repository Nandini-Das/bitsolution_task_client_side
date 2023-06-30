import {
    createBrowserRouter,

  } from "react-router-dom";

import Main from "../Layout/Main";
import Dashboard from "../Pages/Dashboard";
import AddProduct from "../Pages/AddProduct";
import AllProduct from "../Pages/AllProduct";
import UpdateProduct from "../Pages/UpdateProduct";
import Home from "../Pages/Home";

  
  export  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: "/",
            element:<Home></Home>
        },
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
            loader: ({params}) => fetch(`https://bitsolution-task-server-nandini-das.vercel.app/addedProduct/${params.id}`),
        },
      ]
    },
  ]);
 