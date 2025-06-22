import { lazy } from "react";
import Loadable from "../Loadable/loadable";
import Login from "../Authentication/Login";
import Register from "../Authentication/Register";
import AddCourses from "../Pages/AddCourses";

const AdminLayput = Loadable(lazy(() => import("../Layouts/AdminLayout")));
const BlankLayout = Loadable(lazy(() => import("../Layouts/BlankLayout")));
const Home = Loadable(lazy(() => import("../Pages/Home")));

const routes = [
  {
    path: "/",
    element: <AdminLayput />,
    children: [
      { path: "/home", element: <Home /> },
      { path: "/addcourses", element: <AddCourses /> },
    ],
  },
  {
    path: "/",
    element: <BlankLayout />,
    children: [
      { path: "/login", element: <Login /> },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
];

export default routes;
