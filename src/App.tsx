// import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Home, Team, Event, About, Join } from "./pages";
import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import SingleEvent from "./pages/SingleEvent";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/team", element: <Team /> },
  { path: "/events", element: <Event /> },
  { path: "/event/:id", element: <SingleEvent /> },
  { path: "/join", element: <Join /> },
  { path: "*", element: <Navigate to="/" /> },
]);

export default function App() {
  return (
    <>
      <NavBar />
      <RouterProvider router={router} />
      <Footer />
    </>
  );
}
