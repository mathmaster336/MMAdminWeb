import { lazy, useEffect, useState } from "react";
import Loadable from "../Loadable/loadable";
import Login from "../Authentication/Login";
import Register from "../Authentication/Register";
import AddCourses from "../Pages/AddCourses";
// import Courses from "";
import { Navigate, useRoutes } from "react-router-dom";
import { deleteLocalStorage, getLocalStorage } from "../Utils/HelperMethods/Localstorage";
import { MMapi } from "../Services/MMapi";
import AdminLayput from "../Layouts/AdminLayout";
import CoureseContent from "../Pages/CoureseContent";
import NotFoundPage from "../NotFoundPage";
import MyProfile from "../Pages/MyProfile";
import ForgotPassword from "../Authentication/ForgetPassword";

const Router = () => {
  // const AdminLayput = Loadable(lazy(() => import("../Layouts/AdminLayout")));
  const BlankLayout = Loadable(lazy(() => import("../Layouts/BlankLayout")));
  const Home = Loadable(lazy(() => import("../Pages/Home")));
  const Courses =Loadable(lazy(()=>import("../Pages/Courses")))
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const token = getLocalStorage("token");

  useEffect(() => {
    const verifyToken = async () => {
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
          debugger;
          // token invalid or tampered
          setIsAuthenticated(false);
          deleteLocalStorage("token");

        }
      } catch (err) {
        console.error(
          "⛔ Token verification failed:",
          err.response?.data?.error || err.message
        );
         deleteLocalStorage("token");
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
        { path: "*", element: <NotFoundPage /> },
        {path:"/adminForget",element:<ForgotPassword />}
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
        {
          path: "/courses/coursecontent/:courseId",
          element: <CoureseContent />,
        },
        {
          path: "/courses/coursecontent/:courseId/:folderId",
          element: <CoureseContent />,
        },
        { path: "/myProfile", element: <MyProfile /> },

        { path: "*", element: <NotFoundPage /> },
      ],
    },
  ]);
  return routes;
};

export default Router;
