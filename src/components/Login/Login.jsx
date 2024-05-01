import React, { useEffect, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "./login.css";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/actions/authActions";
import { useNavigate } from "react-router-dom";
import BackgroundImage from "../../assets/images/background.png";
import Logo from "../../assets/images/ecom.png";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, token, error } = useSelector((state) => state.auth);
  console.log(user, token, error);
  const handleSubmit = async (event) => {
    // event.preventDefault();
    // setLoading(true);
    // await delay(500);
    event.preventDefault();
    dispatch(loginUser(email, inputPassword));
  };
  useEffect(() => {
    // Clear the token from localStorage when the Login component is mounted
    localStorage.removeItem("token");
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home");
    }
  }, [token]);

  // function delay(ms) {
  //   return new Promise((resolve) => setTimeout(resolve, ms));
  // } useEffect(() => {
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);

        if (decodedToken.exp * 1000 < Date.now()) {
          // Token has expired
          handleLogout();
        } else {
          // Token is still valid, navigate to home page
          navigate("/home");
        }
      } catch (error) {
        // Failed to decode token
        console.error("Failed to decode token:", error);
        handleLogout();
      }
    }
  }, []);
  // useEffect(() => {
  //   if (error) {
  //     toast.error("check the email or password again!");
  //   }
  // }, [error]);

  return (
    <div
      className="sign-in__wrapper"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      {/* Overlay */}
      <div className="sign-in__backdrop"></div>
      {/* Form */}
      <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
        {/* Header */}
        <img
          className="img-thumbnail mx-auto d-block mb-2"
          src={Logo}
          alt="logo"
        />
        <div className="h4 mb-2 text-center">Sign In</div>
        {/* ALert */}
        {show ? (
          <Alert
            className="mb-2"
            variant="danger"
            onClose={() => setShow(false)}
            dismissible
          >
            Incorrect username or password.
          </Alert>
        ) : (
          <div />
        )}
        <Form.Group className="mb-2" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={email}
            placeholder="Email"
            onChange={(e) => setInputUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={inputPassword}
            placeholder="Password"
            onChange={(e) => setInputPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="checkbox">
          <Form.Check type="checkbox" label="Remember me" />
        </Form.Group>
        {!loading ? (
          <Button className="w-100" variant="primary" type="submit">
            Log In
          </Button>
        ) : (
          <Button className="w-100" variant="primary" type="submit" disabled>
            Logging In...
          </Button>
        )}
        {/* <div className="d-grid justify-content-end">
          <Button
            className="text-muted px-0"
            variant="link"
            onClick={handlePassword}
          >
            Forgot password?
          </Button>
        </div> */}
      </Form>
      {/* Footer */}
      <div className="w-100 mb-2 position-absolute bottom-0 start-50 translate-middle-x text-white text-center">
        {/* Made by Hendrik C | &copy;2022 */}
      </div>
    </div>
  );
};

export default Login;
