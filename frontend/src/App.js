import './App.css';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

function App() {
  return (
    <div className="App">
      <div className="auth-wrapper">
        <Authenticator>
          {({ signOut, user }) => (
            <main className="welcome-box">
              <h2>👋 Welcome, {user.username}</h2>
              <p>You're now signed in to Cloud Assistant</p>
              <button className="signout-btn" onClick={signOut}>Sign out</button>
            </main>
          )}
        </Authenticator>
      </div>
    </div>
  );
}

export default App;
