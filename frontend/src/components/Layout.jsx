import React from "react";
import { NavLink } from "react-router-dom";
import CommandMenu from "./CommandMenu";
import { Container, Row, Col, Button } from "react-bootstrap";

function Layout({ user, signOut, children }) {
  return (
    <Container fluid className="my-4">
      <Row>
        <Col md={3} className="sticky-sidebar">
          <CommandMenu />
        </Col>

        <Col md={9}>
          <div className="d-flex justify-content-between align-items-start flex-wrap mb-3">
            <div>
              <h3 className="mb-1">
                👋 Welcome,{" "}
                <span className="text-primary">{user.username}</span>
              </h3>
              <p className="text-muted mb-2">
                You're now signed in to Cloud Assistant
              </p>
              <div>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    "btn me-2 " +
                    (isActive ? "btn-primary" : "btn-outline-primary")
                  }
                >
                  💬 Chat
                </NavLink>
                <NavLink
                  to="/history"
                  className={({ isActive }) =>
                    "btn " + (isActive ? "btn-primary" : "btn-outline-primary")
                  }
                >
                  🕘 History
                </NavLink>
              </div>
            </div>

            <div className="mt-2 mt-md-0">
              <Button variant="danger" onClick={signOut}>
                Sign Out
              </Button>
            </div>
          </div>

          {children}
        </Col>
      </Row>
    </Container>
  );
}

export default Layout;
