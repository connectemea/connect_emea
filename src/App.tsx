// import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Home, Team, Event, About, Join } from "@/pages";

import SingleEvent from "@/pages/SingleEvent";
import { GuestLayout } from "@/layout";

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
    ],
  },
  { path: "*", element: <Navigate to="/" /> },
]);

export default function App() {
  return (
    <>
      
      <RouterProvider router={router} />
    </>
  );
}
