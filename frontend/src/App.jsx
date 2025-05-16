import "./App.css";
import "./style/Chat.css";
import "./style/History.css";
import "./style/Navigation.css";
import "./style/CommandMenu.css";

import { Routes, Route } from "react-router-dom";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import Chat from "./components/Chat";
import History from "./components/History";
import Layout from "./components/Layout";

function App() {
  return (
    <div className="app-container">
      <Authenticator>
        {({ signOut, user }) => (
          <Layout user={user} signOut={signOut}>
            <Routes>
              <Route path="/" element={<Chat user={user} />} />
              <Route path="/history" element={<History user={user} />} />
            </Routes>
          </Layout>
        )}
      </Authenticator>
    </div>
  );
}

export default App;
