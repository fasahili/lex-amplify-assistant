import React, { useState } from "react";
import "../style/CommandMenu.css";

function CommandMenu() {
  const commands = [
    {
      category: "EC2 Instances",
      items: [
        "list my ec2 instances",
        "start instance i-xxxxxxxxxxxxxxx",
        "stop instance i-xxxxxxxxxxxxxxx",
      ],
    },
    {
      category: "Networking",
      items: ["list my vpcs", "describe all vpcs"],
    },
    {
      category: "S3 Buckets",
      items: ["list my buckets", "show s3 buckets", "get all s3 storage"],
    },
    {
      category: "Help & Built-in",
      items: ["help", "cancel", "repeat"],
    },
  ];

  const [open, setOpen] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <div className="command-menu">
      <h4>💡 Sample Commands</h4>
      {commands.map((group, idx) => {
        const isOpen = open === idx;
        return (
          <div key={idx} className="command-group">
            <div
              className="accordion-header"
              onClick={() => setOpen(isOpen ? null : idx)}
            >
              <span>{group.category}</span>
              <span className={`arrow ${isOpen ? "open" : ""}`}>▸</span>
            </div>
            {isOpen && (
              <ul>
                {group.items.map((cmd, i) => {
                  const id = `${idx}-${i}`;
                  return (
                    <li key={id}>
                      <span>{cmd}</span>
                      <button
                        className="copy-btn"
                        onClick={() => handleCopy(cmd, id)}
                      >
                        {copiedIndex === id ? "✅" : "📋"}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default CommandMenu;
