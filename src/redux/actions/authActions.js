// actions/authActions.js
import axios from "axios";
export const loginRequest = (email, password) => ({
  type: "LOGIN_REQUEST",
  payload: { email, password },
});

export const loginSuccess = (user, token) => ({
  type: "LOGIN_SUCCESS",
  payload: { user, token },
});

export const loginFailure = (error) => ({
  type: "LOGIN_FAILURE",
  payload: { error },
});

export const loginUser = (email, password) => {
  return async (dispatch) => {
    dispatch(loginRequest(email, password)); // Dispatch login request action
    console.log(email, password);
    try {
      // Make API call to authenticate user
      const response = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });
      //   console.log(res)
      localStorage.setItem("token", response.data.token);
      // If authentication is successful, dispatch login success action
      dispatch(loginSuccess(response.data.user, response.data.token));
    } catch (error) {
      // If there's an error, dispatch login failure action
      dispatch(loginFailure(error.message));
    }
  };
};
