import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import { Container, Card, ListGroup, Button, Badge } from "react-bootstrap";
import "../style/History.css";

function History({ user }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://redzg3wajfqtaoed35g3fpz7gi0hrioy.lambda-url.us-east-1.on.aws/?username=${user.username}`
        );
        const data = await res.json();
        if (Array.isArray(data)) {
          setMessages(data);
        } else {
          console.error("Invalid data format:", data);
        }
      } catch (err) {
        console.error("Failed to fetch history:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user.username]);

  const clearHistory = async () => {
    const confirmed = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete all your chat history!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, clear it!",
    });

    if (!confirmed.isConfirmed) return;

    setDeleting(true);
    try {
      const res = await fetch(
        "https://rl555qxrbirvqagt7zgl7ha7r40fuqov.lambda-url.us-east-1.on.aws/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: user.username }),
        }
      );

      if (!res.ok) throw new Error("Delete failed");

      setMessages([]);
      Swal.fire("Cleared!", "Chat history deleted.", "success");
    } catch (err) {
      console.error("Failed to clear history:", err);
      Swal.fire("Error", "Could not clear history.", "error");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Container className="my-4">
      <Card className="shadow-sm border-0">
        <Card.Header className="history-header d-flex justify-content-between align-items-center px-4 py-3">
          <div className="d-flex align-items-center gap-2">
            <span className="history-icon">🕓</span>
            <h5 className="mb-0 fw-bold text-dark">Conversation History</h5>
          </div>
          <Button
            variant="outline-danger"
            size="sm"
            className="fw-semibold shadow-sm"
            onClick={clearHistory}
            disabled={deleting}
          >
            {deleting ? "⏳ Deleting…" : "🗑 Clear History"}
          </Button>
        </Card.Header>

        <Card.Body className="scrollable-history">
          {loading ? (
            <div className="d-flex justify-content-center py-4">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : messages.length === 0 ? (
            <div className="text-muted text-center py-4">
              No chat history found.
            </div>
          ) : (
            <ListGroup variant="flush">
              {messages.map((msg, i) => (
                <ListGroup.Item key={i} className="py-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <Badge
                        bg={msg.sender === "user" ? "primary" : "warning"}
                        className="me-2"
                      >
                        {msg.sender === "user" ? user.username : "Lexi"}
                      </Badge>
                      <span className="ms-1">{msg.message}</span>
                    </div>
                    <small className="text-muted">
                      {new Date(msg.timestamp).toLocaleString()}
                    </small>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default History;
