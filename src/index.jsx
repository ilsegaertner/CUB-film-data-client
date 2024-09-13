import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view";
import { BrowserRouter } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";

// Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";
import { StrictMode } from "react";
import { UserProvider } from "./userContext";

// Main component (will eventually use all the others)
const App = () => {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <MainView />
        </BrowserRouter>
      </UserProvider>
      <ToastContainer position="top-center" autoClose={1500} />
    </>
  );
};

// Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<App />);
