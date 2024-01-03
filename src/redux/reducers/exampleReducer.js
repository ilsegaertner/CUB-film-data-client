// the reducer describes how the action needs to be updated. It defines how the state of the app changes in response
// to the action sent to the store. It is the only way to update/manipulate the state.

// ExampleReducer
const initialState = {
  // Initial state properties
};

const exampleReducer = (state = initialState, action) => {
  switch (action.type) {
    // Handle different action types and update state accordingly
    default:
      return state;
  }
};

export default exampleReducer;
