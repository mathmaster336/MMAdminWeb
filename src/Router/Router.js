import { lazy, useEffect, useState } from "react";
import Loadable from "../Loadable/loadable";
import Login from "../Authentication/Login";
import Register from "../Authentication/Register";
import AddCourses from "../Pages/AddCourses";
import Courses from "../Pages/Courses";
import { Navigate, useRoutes } from "react-router-dom";
import { getLocalStorage } from "../Utils/HelperMethods/Localstorage";
import {MMapi} from "../Services/MMapi";
import AdminLayput from "../Layouts/AdminLayout";
import CoureseContent from "../Pages/CoureseContent";
import NotFoundPage from "../NotFoundPage";

const Router = () => {
  // const AdminLayput = Loadable(lazy(() => import("../Layouts/AdminLayout")));
  const BlankLayout = Loadable(lazy(() => import("../Layouts/BlankLayout")));
  const Home = Loadable(lazy(() => import("../Pages/Home")));

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const token = getLocalStorage("token");

  useEffect(() => {
    const verifyToken = async () => {
      debugger;
      if (!token) {
        setIsAuthenticated(false);
        return;
      }
      try {
        const req = {};
        const res = await MMapi.post("/auth/admintokenverify", req);
        console.log("✅ Token is valid:", res.user); // decoded user object
        if (res.message === "valid") {
          // token is good
          setIsAuthenticated(true);
        } else {
          // token invalid or tampered
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error(
          "⛔ Token verification failed:",
          err.response?.data?.error || err.message
        );
        return false;
      }
    };

    verifyToken();
  }, [token]);

  const routes = useRoutes([
    {
      path: "/",
      element: <BlankLayout />,
      children: !isAuthenticated && [
        {
          path: "/",
          element: <Navigate to={isAuthenticated ? "/home" : "/login"} />,
        },
        { path: "/login", element: <Login /> },
        {
          path: "/register",
          element: <Register />,
        },
        {path:"*",element:<NotFoundPage />}

      ],
    },
    {
      path: "/",
      element: <AdminLayput />,
      children: isAuthenticated && [
        {
          path: "/",
          element: <Navigate to={isAuthenticated ? "/home" : "/login"} />,
        },
        { path: "/home", element: <Home /> },
        { path: "/addcourses", element: <AddCourses /> },
        { path: "/courses", element: <Courses /> },
        {path:"/courses/coursecontent/:courseId", element:<CoureseContent />},
        {path:"/courses/coursecontent/:courseId/:folderId", element:<CoureseContent />},

        {path:"*",element:<NotFoundPage />}
      ],
    },
  ]);
  return routes;
};

export default Router;
