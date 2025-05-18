import "./App.css";
import "./style/Chat.css";
import "./style/History.css";
import "./style/CommandMenu.css";

import React, { useState} from "react";
import { Routes, Route } from "react-router-dom";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Chat from "./components/Chat";
import History from "./components/History";
import Layout from "./components/Layout";

function App() {
  const [messages, setMessages] = useState([]);
  return (
    <div className="app-container">
      <Authenticator>
        {({ signOut, user }) => (
          <Layout user={user} signOut={signOut}>
            <Routes>
              <Route
                path="/"
                element={
                  <Chat
                    user={user}
                    messages={messages}
                    setMessages={setMessages}
                  />
                }
              />
              <Route path="/history" element={<History user={user} />} />
            </Routes>
          </Layout>
        )}
      </Authenticator>
    </div>
  );
}

export default App;