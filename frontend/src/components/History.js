import React, { useEffect, useState } from "react";
import Loader from "./Loader";

import Swal from "sweetalert2";

function History({ user }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchHistory();
  }, [user.username]);

  const fetchHistory = async () => {
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

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Server error:", errorData);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong while clearing history!",
        });
        return;
      }

      setMessages([]);
      Swal.fire({
        icon: "success",
        title: "Cleared!",
        text: "Chat history deleted successfully.",
      });
    } catch (err) {
      console.error("Failed to clear history:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Could not clear history. Please try again later.",
      });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <div className="history-page">
        <div className="history-header">
          <div className="history-title-group">
            <div className="history-icon">
              <span role="img" aria-label="clock">
                🕓
              </span>
            </div>

            <h3 className="history-title">Conversation Log</h3>
          </div>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <div className="history-messages">
            {messages.length === 0 ? (
              <div className="empty-state">No chat history found.</div>
            ) : (
              messages.map((msg, i) => (
                <div key={i} className={`msg ${msg.sender}`}>
                  <strong>{msg.sender}:</strong> {msg.message}
                  <div className="timestamp">
                    {new Date(msg.timestamp).toLocaleString()}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <div className="clear-wrapper">
        <button
          className="clear-btn"
          onClick={clearHistory}
          disabled={deleting}
        >
          {deleting ? "⏳ Deleting…" : "🗑 Delete All Messages"}
        </button>
      </div>
    </>
  );
}

export default History;
