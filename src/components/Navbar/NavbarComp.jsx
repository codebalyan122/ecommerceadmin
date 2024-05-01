import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css"; // Custom styles for Navbar
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const AdminNavbar = ({ toggleDrawer, state }) => {
  const navigate = useNavigate();
  const logout = () => {
    console.log("hello");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-light bg-light ${
        state.left ? "navbarsomething" : ""
      }`}
    >
      <div className="container-fluid ">
        <IconButton onClick={toggleDrawer("left", !state.left)}>
          <MenuIcon />
        </IconButton>
        <div className="dropdown ">
          <button
            className="btn  dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <FontAwesomeIcon
              onClick={logout}
              icon={faUser}
              className="user-icon"
            />
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <Link onClick={logout} className="dropdown-item">
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
