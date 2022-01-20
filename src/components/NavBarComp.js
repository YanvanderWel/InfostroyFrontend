import React, { Component } from "react";
import { Container, Navbar, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getName, removeName } from "../util/localstorage";
import { changeHandPosition, logout } from "../util/ws";

function NavBarComp() {
  const navigate = useNavigate();
  function logoutHandler() {
    logout({ name: getName() });
    removeName();
    navigate("/login");
  }
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <NavDropdown title="Actions" id="basic-nav-dropdown">
            <NavDropdown.Item
              onClick={() => changeHandPosition({ name: getName() })}
            >
              Raise hand up
            </NavDropdown.Item>
          </NavDropdown>

          <Navbar.Toggle />

          <Navbar.Collapse className="justify-content-end">
            <NavDropdown title={getName()} id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => logoutHandler()}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBarComp;
