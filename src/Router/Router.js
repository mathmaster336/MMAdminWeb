import  { lazy } from "react";
import Loadable from "../Loadable/loadable";

const AdminLayput = Loadable(lazy(()=>import('../Layouts/AdminLayout')))
const BlankLayout = Loadable(lazy(()=>import('../Layouts/BlankLayout')))
const Home = Loadable(lazy(()=>import('../Pages/Home')))

const routes = [
  {
    path: "/",
    element: <AdminLayput />,
    children: [{ path: "/home", element: <Home /> }],
  },
];

export default  routes;
