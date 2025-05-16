import React, { useState } from "react";
import {
  LexRuntimeV2Client,
  RecognizeTextCommand,
} from "@aws-sdk/client-lex-runtime-v2";
import { fetchAuthSession } from "@aws-amplify/auth";
import TypingIndicator from "./TypingIndicator";
import "../style/Chat.css";

function Chat({ user }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [botTyping, setBotTyping] = useState(false);

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
      const botReply =
        response?.messages?.[0]?.content || "🤖 No reply from bot.";
      const updatedMessages = [...newMessages, { from: "bot", text: botReply }];
      setMessages(updatedMessages);
      await logMessageToDynamo(user.username, botReply, "bot");
    } catch (err) {
      console.error(err);
    } finally {
      setBotTyping(false);
    }
  };

  return (
    <div className="chat-box">
      <div className="chat-messages">
        {messages.length === 0 && !botTyping && (
          <div className="empty-chat">
            No messages yet. Start the conversation 👋
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`msg ${msg.from} animated`}>
            {msg.text}
          </div>
        ))}
        {botTyping && <TypingIndicator />}
      </div>

      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Say something..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
