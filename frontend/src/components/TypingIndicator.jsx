import { motion } from "framer-motion";
import "../style/TypingIndicator.css";

const bubbleVariants = {
  start: {
    scale: 0.8,
    opacity: 0.3,
  },
  end: {
    scale: 1.2,
    opacity: 1,
  },
};

const TypingIndicator = () => {
  return (
    <div className="typing-indicator-container">
      <motion.div
        className="dot"
        variants={bubbleVariants}
        initial="start"
        animate="end"
        transition={{
          duration: 0.6,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="dot"
        variants={bubbleVariants}
        initial="start"
        animate="end"
        transition={{
          duration: 0.6,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: 0.2,
        }}
      />
      <motion.div
        className="dot"
        variants={bubbleVariants}
        initial="start"
        animate="end"
        transition={{
          duration: 0.6,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: 0.4,
        }}
      />
    </div>
  );
};

export default TypingIndicator;
