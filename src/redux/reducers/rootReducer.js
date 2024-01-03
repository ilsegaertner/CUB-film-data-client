import { combineReducers } from "redux";
import exampleReducer from "./exampleReducer";

const rootReducer = combineReducers({
  example: exampleReducer, // Add more reducers here if needed
  // Additional reducers...
});

export default rootReducer;
