import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "../components/Main-Page/MainPage";
import React from "react";
import Login from "../components/Login/Login";
import Home from "../components/Home/Home";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainPage />,
    },
    {
      path: "/",
      element: <Login />,
      children: [
        {
          path: "/home",
          element: <Home />,
        },
      ],
    },

    {
      path: "*",
      element: <div>page not found</div>,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
