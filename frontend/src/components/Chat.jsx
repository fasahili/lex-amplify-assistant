import React, { useState, useRef, useEffect } from "react";
import {
  LexRuntimeV2Client,
  RecognizeTextCommand,
} from "@aws-sdk/client-lex-runtime-v2";
import { fetchAuthSession } from "@aws-amplify/auth";
import TypingIndicator from "./TypingIndicator";
import { motion, AnimatePresence } from "framer-motion";
import "../style/Chat.css";
import LexiLogo from "./LexiLogo";
import {
  Card,
  InputGroup,
  FormControl,
  Button,
  ListGroup,
  Container,
} from "react-bootstrap";

function Chat({ user, messages, setMessages }) {
  const [input, setInput] = useState("");
  const [botTyping, setBotTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, botTyping]);

  const logMessageToDynamo = async (username, message, sender) => {
    try {
      await fetch(
        "https://5ps3bnhirtl3zxpp63rpf4iamm0rwmxn.lambda-url.us-east-1.on.aws/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, message, sender }),
        }
      );
    } catch (err) {
      console.error("Failed to log to DynamoDB", err);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const session = await fetchAuthSession();
    const credentials = session.credentials;

    const newMessages = [...messages, { from: "user", text: input }];
    setMessages(newMessages);
    await logMessageToDynamo(user.username, input, "user");
    setInput("");
    setBotTyping(true);

    try {
      const client = new LexRuntimeV2Client({
        region: "us-east-1",
        credentials,
      });
      const command = new RecognizeTextCommand({
        botAliasId: "TSTALIASID",
        botId: "ELIQSRW3SS",
        localeId: "en_US",
        sessionId: user.username,
        text: input,
      });

      const response = await client.send(command);
      const fullReply =
        response?.messages?.[0]?.content || "🤖 No reply from Lexi.";

      let displayText = "";
      let index = 0;

      const typeReply = () => {
        const typing = setInterval(() => {
          displayText += fullReply[index];
          setMessages([...newMessages, { from: "lexi", text: displayText }]);
          index++;

          if (index === fullReply.length) {
            clearInterval(typing);
            setBotTyping(false);
            logMessageToDynamo(user.username, fullReply, "lexi");
          }
        }, 25);
      };

      setTimeout(typeReply, 600);
    } catch (err) {
      console.error(err);
      setBotTyping(false);
    }
  };

  return (
    <Container className="my-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="chat-card">
          <Card.Header>
            <LexiLogo />
          </Card.Header>

          <Card.Body className="chat-body">
            {messages.length === 0 && !botTyping ? (
              <motion.div
                className="placeholder-message"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                🤖 Lexi is ready… <br />
                <span className="placeholder-subtext">
                  Start the conversation{" "}
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    style={{ display: "inline-block" }}
                  >
                    👋
                  </motion.span>
                </span>
              </motion.div>
            ) : (
              <ListGroup variant="flush">
                <AnimatePresence>
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ListGroup.Item
                        className={`d-flex ${
                          msg.from === "user"
                            ? "justify-content-end text-end"
                            : "justify-content-start text-start"
                        }`}
                      >
                        <div className="d-flex align-items-start">
                          {msg.from === "lexi" && (
                            <span className="me-2 fw-semibold text-primary">
                              Lexi
                            </span>
                          )}
                          <div>
                            {msg.text.split("\n").map((line, j) => (
                              <div key={j}>{line}</div>
                            ))}
                          </div>
                          {msg.from === "user" && (
                            <span className="ms-2 fw-semibold text-primary">
                              {user.username}
                            </span>
                          )}
                        </div>
                      </ListGroup.Item>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {botTyping && (
                  <ListGroup.Item>
                    <TypingIndicator />
                  </ListGroup.Item>
                )}

                <div ref={messagesEndRef} />
              </ListGroup>
            )}
          </Card.Body>

          <Card.Footer className="chat-input p-2">
            <InputGroup className="rounded shadow-sm overflow-hidden">
              <FormControl
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="bg-white border-0 py-2 px-3"
              />
              <Button onClick={handleSend} className="send-button">
                Send
              </Button>
            </InputGroup>
          </Card.Footer>
        </Card>
      </motion.div>
    </Container>
  );
}

export default Chat;
