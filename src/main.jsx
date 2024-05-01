import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import toast, { Toaster } from "react-hot-toast";
import SignUp from "./components/Signup/SignUp";
import Login from "./components/Login/Login";
import { Provider } from "react-redux";
import store from "./redux/store";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/home/home";
import Settings from "./components/Settings/Settings";
import Slider from "./components/slider/Slider";
import AddSlider from "./components/slider/AddSlider";
import Product from "./components/addproducts/Product";
import Addproduct from "./components/addproducts/Addproduct";
import TopCategory from "./components/TopCategory/TopCategory";
import MidCategory from "./components/MidCategory/MidCategory";
import AddTopCategory from "./components/TopCategory/AddTopCategory";
import AddMidcategory from "./components/MidCategory/AddMidcategory";
import EditSlider from "./components/slider/EditSlider";
import EditTopCategory from "./components/TopCategory/EditTopCategory";
import EditMidcategory from "./components/MidCategory/EditMidcategory";
import Editproduct from "./components/addproducts/Editproduct";
import ProtectedRoute from "./ProtectedRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/settings",
    element: (
      <ProtectedRoute>
        <Settings />
      </ProtectedRoute>
    ),
  },
  {
    path: "/slider",
    element: (
      <ProtectedRoute>
        <Slider />
      </ProtectedRoute>
    ),
  },
  {
    path: "/addslider",
    element: (
      <ProtectedRoute>
        <AddSlider />
      </ProtectedRoute>
    ),
  },
  {
    path: "/edit-slider/:id",
    element: (
      <ProtectedRoute>
        <EditSlider />
      </ProtectedRoute>
    ),
  },
  {
    path: "/products",
    element: (
      <ProtectedRoute>
        <Product />
      </ProtectedRoute>
    ),
  },
  {
    path: "/addproduct",
    element: (
      <ProtectedRoute>
        <Addproduct />
      </ProtectedRoute>
    ),
  },
  {
    path: "/edit-product/:id",
    element: (
      <ProtectedRoute>
        <Editproduct />
      </ProtectedRoute>
    ),
  },
  {
    path: "/topcategory",
    element: (
      <ProtectedRoute>
        <TopCategory />
      </ProtectedRoute>
    ),
  },
  {
    path: "/addTopcategory",
    element: (
      <ProtectedRoute>
        <AddTopCategory />
      </ProtectedRoute>
    ),
  },
  {
    path: "/edit-topcategory/:id",
    element: (
      <ProtectedRoute>
        <EditTopCategory />
      </ProtectedRoute>
    ),
  },
  {
    path: "/midcategory",
    element: (
      <ProtectedRoute>
        <MidCategory />
      </ProtectedRoute>
    ),
  },
  {
    path: "/addmidcategory",
    element: (
      <ProtectedRoute>
        <AddMidcategory />
      </ProtectedRoute>
    ),
  },
  {
    path: "/edit-midcategory/:id",
    element: (
      <ProtectedRoute>
        <EditMidcategory />
      </ProtectedRoute>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
    <Toaster position="top-center" reverseOrder={false} />
  </Provider>
  // {/* </React.StrictMode> */}
);
