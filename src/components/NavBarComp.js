import React, { useEffect, useState } from "react";
import { Container, Navbar, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../util/backendApi";
import { getName, removeName } from "../util/localstorage";
import { changeHandPosition, logout } from "../util/ws";

function NavBarComp() {
  const [handPosition, setHandPosition] = useState(false);

  // when code rerenders we pull hand position from server to show right position.
  useEffect(() => {
    console.log("rerendering...");
    if (getName()) {
      getAllUsers().then((response) => {
        setHandPosition(
          response.data.find((user) => user.name == getName()).handRaised
        );
      });
    }
  }, []);

  function isHandRaised() {
    getAllUsers().then((response) => {
      setHandPosition(
        response.data.find((user) => user.name == getName()).handRaised
      );
    });
  }

  const navigate = useNavigate();
  function logoutHandler() {
    logout({ name: getName() });
    removeName();
    navigate("/login");
  }
  return (
    <div>
      {getName() && (
        <div>
          <Navbar bg="light" expand="lg">
            <Container>
              <NavDropdown title="Actions" id="basic-nav-dropdown">
                <NavDropdown.Item
                  onClick={() => {
                    new Promise((resolve) => {
                      changeHandPosition({ name: getName() });
                      resolve();
                    }).then(() => {
                      setTimeout(() => {
                        isHandRaised();
                      }, 30);
                    });
                  }}
                >
                  {handPosition ? "Raise hand down" : "Raise hand up"}
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
      )}
    </div>
  );
}

export default NavBarComp;
