// The action creator creates an action. This action only describes what needs to be done, but not how.
// That’s the job of a reducer.

import { UPDDATE_USER } from "../constants/actionTypes";

// Action creater function
export const updateUser = (newValue) => {
  return {
    type: UPDDATE_USER,
    payload: newValue,
  };
};
// Define other action creator functions as needed
