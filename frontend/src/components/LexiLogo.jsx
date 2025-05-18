import React from "react";
import { motion } from "framer-motion";
import botIcon from "../assets/logolexi.png";
import "../style/LexiLogo.css";

const LexaLogo = ({ size = 36 }) => {
  return (
    <motion.div
      className="d-flex align-items-center gap-3 logo-container"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="logo-circle"
        style={{ width: size, height: size }}
        initial={{ scale: 0.8 }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      >
        <img
          src={botIcon}
          alt="Lexi"
          className="logo-img"
          style={{ width: size * 0.6, height: size * 0.6 }}
        />
      </motion.div>

      <div>
        <span className="logo-title">Lexi</span>
        <span className="logo-sub">– Cloud Assistant</span>
      </div>
    </motion.div>
  );
};

export default LexaLogo;
