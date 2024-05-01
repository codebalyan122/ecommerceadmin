// reducers/authReducer.js

const initialState = {
  user: null,
  token: null,
  error: null,
  loading: false,
  msg: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return { ...state, loading: true, error: null };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };
    case "LOGIN_FAILURE":
      return { ...state, loading: false, error: action.payload.error };
    default:
      return state;
  }
};

export default authReducer;
