import React from 'react';
import { Navbar, NavbarBrand, Container, Nav, NavDropdown } from 'react-bootstrap';
import styles from '../styles/NavBar.module.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { Link } from 'react-router-dom';
import logo from '../logo/tripbuddy_icon_lg.png';

const NavigationBar = () => {
  const navigate = useNavigate();
  const { getToken, removeToken, user } = useAuth();

  const isLoggedIn = () => {
    return !!getToken();
  };

  const isLoggedInStaff = () => {
    return user.status === 'IT' || user.status === 'Security';
  };

  const logout = () => {
    removeToken();
    navigate('/home');
    alert('Logged out successfully');
  };

  return (
    <Navbar bg="dark" variant="dark" className="mb-5" sticky="top">
      <Container>
        <Navbar.Brand href="/home" className="row align-items-center justify-content-start">
        <img
            src={logo}
            alt="TripBuddy Logo"
            width="auto"
            height="40"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        {!isLoggedIn() && (
          <Nav className={styles.navbar}>
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/browse">Browse Destinations</Nav.Link>
            <Nav.Link className={styles.login} as={Link} to="/login">Login</Nav.Link>
          </Nav>
        )}

        {isLoggedIn() && (
          <Nav className={styles.navbar}>
            <Nav className="me-auto">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/browse">Browse</Nav.Link>
              <Nav.Link href="/my-posts">My Posts</Nav.Link>
              <Nav.Link href="/saved">Saved Posts</Nav.Link>
              <Nav.Link href="/new-post">Add New Post</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="#"></Nav.Link>
              <NavDropdown className={styles.setting} title="Settings" id="collasible-nav-dropdown">
                <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/emergency">Emergency Contact</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/subscription">Subscriptions</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/payment">Payment Methods</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/faq">FAQ</NavDropdown.Item>

                {isLoggedIn() && isLoggedInStaff() && (
                  <>
                    <NavDropdown.Item as={Link} to="/status">Status</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/manage">Management</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/security">Security</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/admin/faq">Manage FAQ</NavDropdown.Item>
                  </>
                )}
              </NavDropdown>
              <Nav.Link className={styles.logout} onClick={logout} to="/logout">
                Logout
              </Nav.Link>
            </Nav>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
