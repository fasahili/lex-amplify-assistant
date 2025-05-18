import React, { useState } from "react";
import {
  FaChevronDown,
  FaChevronUp,
  FaCopy,
  FaServer,
  FaNetworkWired,
  FaDatabase,
  FaQuestionCircle,
} from "react-icons/fa";
import { Card, Button, Collapse } from "react-bootstrap";
import "../style/CommandMenu.css";

function CommandMenu({ onRunCommand }) {
  const [openSections, setOpenSections] = useState({});
  const [copiedCommand, setCopiedCommand] = useState(null);

  const toggleSection = (category) => {
    setOpenSections((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const iconMap = {
    "EC2 Instances": <FaServer className="me-2" />,
    Networking: <FaNetworkWired className="me-2" />,
    "S3 Buckets": <FaDatabase className="me-2" />,
    "Help & Built-in": <FaQuestionCircle className="me-2" />,
  };

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

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedCommand(text);

    setTimeout(() => {
      setCopiedCommand(null);
    }, 2000);
  };

  return (
    <Card className="command-menu shadow-sm sticky-sidebar">
      <h5 className="menu-header">💡 Sample Commands</h5>
      {commands.map(({ category, items }) => (
        <div key={category} className="mb-3">
          <div
            className="accordion-header clickable"
            onClick={() => toggleSection(category)}
          >
            <span className="fw-semibold d-flex align-items-center justify-content-between w-100">
              <span>
                {iconMap[category]} {category}
              </span>
              {openSections[category] ? <FaChevronUp /> : <FaChevronDown />}
            </span>
          </div>

          <Collapse in={openSections[category]}>
            <div className="command-group">
              <ul>
                {items.map((cmd, i) => (
                  <li key={i}>
                    <span className="text-danger">{cmd}</span>
                    <div className="d-flex align-items-center gap-2">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleCopy(cmd)}
                      >
                        <FaCopy />
                      </Button>
                      {copiedCommand === cmd && (
                        <span className="text-success fw-semibold">
                          Copied!
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Collapse>
        </div>
      ))}
    </Card>
  );
}

export default CommandMenu;
