import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view";
import { BrowserRouter } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";
import { StrictMode } from "react";

// Main component (will eventually use all the others)
const App = () => {
  return (
    <StrictMode>
      <BrowserRouter>
        <MainView />
      </BrowserRouter>
    </StrictMode>
  );
};

// Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<App />);
