import { Dispatch } from "react";
import {
  Container,
  Nav,
  Navbar as NavbarBs,
  NavDropdown,
  Image,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { NavLink } from "react-router-dom";
import { logout } from "../redux/actions/user.action";
import store from "../redux/store";

export function Navbar() {
  const dispatch = store.dispatch as typeof store.dispatch | Dispatch<any>;
  const { userInfo } = useSelector((state: any) => state.userLogin);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <NavbarBs bg="primary" variant="dark">
      <Container>
        <NavbarBs.Brand>
          <LinkContainer to="/">
            <NavbarBs.Brand>MangoHolidays (Pvt) Ltd</NavbarBs.Brand>
          </LinkContainer>
        </NavbarBs.Brand>
        <NavbarBs.Toggle aria-controls="basic-navbar-nav" />
        <NavbarBs.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav className="jml-auto align-items-center">
            {userInfo ? (
              <NavDropdown
                className="dropdown-avatar"
                title={
                  <div className="d-flex align-items-center">
                    <Image
                      className="avatar"
                      src={`/src/assets/icons/user-default.jpg`}
                      alt="Avatar"
                    />
                    {userInfo.fullname}
                  </div>
                }
                id="basic-nav-dropdown"
              >
                <LinkContainer to="/bookings/me">
                  <NavDropdown.Item>My Bookings</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/account/profile">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link>Register</Nav.Link>
                </LinkContainer>
              </>
            )}
            {userInfo && userInfo.isAdmin && (
              <NavDropdown
                className="ms-4 dropdown-avatar"
                title="Admin"
                id="basic-nav-dropdown"
              >
                <LinkContainer to="/admin/rooms">
                  <NavDropdown.Item>Rooms</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/bookings">
                  <NavDropdown.Item>Bookings</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/users">
                  <NavDropdown.Item>Users</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
          </Nav>
        </NavbarBs.Collapse>
      </Container>
    </NavbarBs>
  );
}
