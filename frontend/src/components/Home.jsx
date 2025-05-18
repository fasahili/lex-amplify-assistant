import React from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../style/Home.css";

function Home() {
  const navigate = useNavigate();

  const handleLogin = () => navigate("/login");

  return (
    <Container className="landing-container">
      <div className="landing-content">
        <h1>Welcome to Lexi 🤖</h1>
        <p className="lead">Your personal AWS Cloud Assistant</p>
        <div className="landing-buttons">
          <Button variant="primary" onClick={handleLogin}>
            Login
          </Button>
          <Button variant="outline-primary" onClick={handleLogin}>
            Sign Up
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default Home;
