import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";

import "bootstrap/dist/css/bootstrap.min.css";
import "./NavBar.css";
import { logout } from "../../actions/userAction";

import { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [visible, setVisible] = useState({ name: "visible" });
  const userLogin = useSelector((state) => state.userLoginReducer);

  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const logoutHandle = () => {
    dispatch(logout());
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Sidebar
          style={{ color: "#fff" }}
          className="sidebar-continer"
          visible={visible}
          onHide={() => setVisible(false)}
        >
          <Link className="link-styling" to={"/getusers"}>
            Usres
          </Link>
          <Link to={"/list"}>Orders</Link>
          <Link to={"/getproducts"}>Products</Link>
          <Link to={"/getcategoryadmin"}>Category</Link>
        </Sidebar>
        <Container>
          <Button
            className="button-sidebar"
            icon="pi pi-arrow-right"
            onClick={(e) => setVisible(true)}
          />

          {/* <Sidebar className="sidebar-shape" /> */}

          <Nav className="me-auto">
            <Nav.Link>
              {" "}
              <Link to={"/admin"} className="nav-links nav-link">Home</Link>
            </Nav.Link>
            <Nav.Link>
              {" "}
              <Link to={"/"} className="nav-links nav-link">
                Back to Store
              </Link>
            </Nav.Link>
          </Nav>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {typeof userInfo !== "undefined" && !Array.isArray(userInfo) ? (
                userInfo.data.user.name
              ) : (
                <Redirect to="/" />
              )}
            </Dropdown.Toggle>
            <Dropdown.Menu
              className="dropdown-menu text-center"
              aria-labelledby="navbarDropdown"
            >
              <Dropdown.Item></Dropdown.Item>
              <Dropdown.Item className="nav-item" onClick={logoutHandle}>
                <div className="nav-links nav-link">Logout</div>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
