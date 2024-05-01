// actions/authActions.js
import axios from "axios";
import toast from "react-hot-toast";
const BASE_URL = import.meta.env.VITE_BASE_URL;
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
      const url = `${BASE_URL}login`;
      console.log(url);
      // Make API call to authenticate user
      const response = await axios.post(url, {
        email,
        password,
      });
      console.log(response);

      //   console.log(res)
      localStorage.setItem("token", response.data.token);
      toast.success("Logged in successfully!");
      // If authentication is successful, dispatch login success action
      dispatch(loginSuccess(response.data.user, response.data.token));
    } catch (error) {
      // If there's an error, dispatch login failure action
      dispatch(loginFailure(error.message));
    }
  };
};
