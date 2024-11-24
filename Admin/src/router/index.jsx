import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "../pages/Login";
import Cuisine from "../pages/app/Cuisine";
import Layout from "../pages/Layout";
import Category from "../pages/app/Category";
import AddStaff from "../pages/app/AddStaff";
import AddCuisine from "../pages/app/AddCuisine";
import EditCuisine from "../pages/app/EditCuisine";
import AddCategory from "../pages/app/AddCategory";
import EditCategory from "../pages/app/EditCategory";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    loader: () => { 
      const token = localStorage.getItem('token')
      if (token) {
        return redirect('/') // klo udh login, langsung redirect ke home
      }
      return null
    }
  },
  {
    path: "/",
    element: <Layout />,
    loader: () => { 
      const token = localStorage.getItem('access_token')
      if (!token) {
        return redirect('/login') // klo blm login, redirect ke login
      }
      return null
    },
    children: [
      {
        path: "",
        element: <Cuisine />
      },
      {
        path: "category",
        element: <Category />
      },
      {
        path: "add-staff",
        element: <AddStaff />
      },
      {
        path: "add-cuisine",
        element: <AddCuisine />
      },
      {
        path: "edit-cuisine/:id",
        element: <EditCuisine />
      },
      {
        path: "add-category",
        element: <AddCategory />
      },
      {
        path: "edit-category/:id",
        element: <EditCategory />
      }
    ]
  }
]);

