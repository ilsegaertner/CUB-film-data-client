// import { createStore } from "redux";
import configureStore from "@reduxjs/toolkit";
import rootReducer from "./reducers"; // Import your root reducer

const store = createStore(rootReducer); // create the Redux Store

export default store;
