// import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Home, Team, Event, About, Join } from "@/pages";

import SingleEvent from "@/pages/SingleEvent";
import { GuestLayout } from "@/layout";


import AdminLayout from "@/layout/adminLayout";
import Dashboard from "@/pages/admin/dashboard";
import Events from "./pages/admin/events";
import Queries from "./pages/admin/queries";


import Login from "./pages/admin/login";
import NotFound from "./notfound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/team", element: <Team /> },
      { path: "/events", element: <Event /> },
      { path: "/event/:id", element: <SingleEvent /> },
      { path: "/join", element: <Join /> },
      // { path: "/admin/responses", element: <FormData /> },
    ],
  },

  {
    path: "/dashboard",
    element: <AdminLayout />,
    children: [
      {
        path: ".",
        element: <Navigate to="" />,
      },
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "events",
        element: <Events />,
      },
      {
        path: "queries",
        element: <Queries />,
      }
    ],
  },
  {
    path: "/signin",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
