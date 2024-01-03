import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store";
import { MainView } from "./components/main-view/main-view";
import Container from "react-bootstrap/Container";

// Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";

// Main component (will eventually use all the others)
const App = () => {
  return (
    <Provider store={store}>
      <Container>
        <MainView />
      </Container>
    </Provider>
  );
};

// Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<App />);
