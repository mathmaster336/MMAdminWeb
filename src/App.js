import "./App.css";
import ScrollToTop from "./Shared/ScrollToTop";
import routes from "./Router/Router";
import { useRoutes } from "react-router-dom";
import Router from "./Router/Router";

function App() {
  const routing =Router();
  return (
   <ScrollToTop>
    {routing}
   </ScrollToTop>
  );
}

export default App;
