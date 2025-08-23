import React from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { toast } from "react-toastify";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Logo from "../assets/images/urban.jpg";
import "./Header.css";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
      toast.success("Logout Successfully!");
    } catch (err) {
      console.error(err);
    }
  };

  const location = useLocation();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const NavLink = ({ to, children }) => {
    const isActive = location.pathname === to;
    return (
      <Nav.Link
        as={Link}
        to={to}
        className={`nav-link ${isActive ? 'active' : ''}`}
      >
        {children}
      </Nav.Link>
    );
  };

  return (
    <Navbar
      expand="lg"
      className="professional-navbar"
      fixed="top"
    >
      <Container className="navbar-container">
        <Navbar.Brand as={Link} to="/" className="navbar-brand">
          <div className="logo-container">
            
            <span className="brand-text">MuscleNook</span>
          </div>
        </Navbar.Brand>
        
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={handleMobileMenuToggle}
          className="navbar-toggle"
        >
          {isMobileMenuOpen ? (
            <CloseIcon className="toggle-icon" />
          ) : (
            <MenuIcon className="toggle-icon" />
          )}
        </Navbar.Toggle>
        
        <Navbar.Collapse id="responsive-navbar-nav" className="navbar-collapse">
          <Nav className="me-auto main-nav">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/pages/features">Features</NavLink>
            <NavLink to="/pages/workouts">Workouts</NavLink>
            <NavLink to="/pages/nutrition-checker">Nutrition</NavLink>
            <NavLink to="/pages/bmr-calculator">Calculator</NavLink>
          </Nav>
          
          <Nav className="auth-nav">
            {userInfo ? (
              <NavDropdown
                title={
                  <span className="user-dropdown-title">
                    <span className="user-avatar">{userInfo.name.charAt(0).toUpperCase()}</span>
                    <span className="user-name">{userInfo.name}</span>
                  </span>
                }
                id="username"
                className="user-dropdown"
              >
                <NavDropdown.Item as={Link} to="/pages/profile" className="dropdown-item">
                  <i className="fas fa-user"></i> Profile
                </NavDropdown.Item>
                <NavDropdown.Item onClick={logoutHandler} className="dropdown-item">
                  <i className="fas fa-sign-out-alt"></i> Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link as={Link} to="/pages/register" className="auth-link register-link">
                  Get Started
                </Nav.Link>
                <Nav.Link as={Link} to="/pages/login" className="auth-link login-link">
                  Sign In
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
