import "./App.css";
import ScrollToTop from "./Shared/ScrollToTop";
import Router from "./Router/Router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const routing = Router();

  return (
    <ScrollToTop>
      {routing}
      
      {/* ✅ Global Toast container */}
      <ToastContainer
        position="top-right"       // ⬅️ Change to "bottom-center" etc. if needed
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </ScrollToTop>
  );
}

export default App;
