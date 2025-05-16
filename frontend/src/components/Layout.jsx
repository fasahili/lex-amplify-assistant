import React from "react";
import { NavLink } from "react-router-dom";
import CommandMenu from "./CommandMenu";

function Layout({ user, signOut, children }) {
  return (
    <div className="auth-wrapper">
      <aside className="sidebar">
        <CommandMenu />
      </aside>

      <div className="main-content">
        <main className="welcome-box">
          <div className="top-bar">
            <h2 className="welcome-title">
              👋 Welcome, <span className="username">{user.username}</span>
            </h2>
            <button className="signout-btn" onClick={signOut}>
              Sign out
            </button>
          </div>

          <p className="welcome-sub">You're now signed in to Cloud Assistant</p>

          <div className="nav-links">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? "nav-btn active" : "nav-btn"
              }
            >
              💬 Chat
            </NavLink>
            <NavLink
              to="/history"
              className={({ isActive }) =>
                isActive ? "nav-btn active" : "nav-btn"
              }
            >
              🕘 History
            </NavLink>
          </div>

          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
