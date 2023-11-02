const SET_USER_TYPE = "SET_USER_TYPE";

// Action created to set the user type
export const setUserType = (userType) => ({
  type: SET_USER_TYPE,
  payload: userType,
});
