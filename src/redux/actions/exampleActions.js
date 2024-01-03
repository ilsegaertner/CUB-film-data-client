import { UPDDATE_USER } from "../constants/actionTypes";

// Action creater function
export const updateUser = (newValue) => {
  return {
    type: UPDDATE_USER,
    payload: newValue,
  };
};
// Define other action creator functions as needed
