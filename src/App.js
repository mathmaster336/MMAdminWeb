import "./App.css";
import ScrollToTop from "./Shared/ScrollToTop";
import routes from "./Router/Router";
import { useRoutes } from "react-router-dom";

function App() {
  const routing = useRoutes(routes);
  return (
   <ScrollToTop>
    {routing}
   </ScrollToTop>
  );
}

export default App;
