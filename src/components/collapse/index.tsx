import { motion, AnimatePresence } from 'motion/react';
import * as React from 'react';

interface CollapseProps {
  isOpen: boolean;
  children: React.ReactNode;
}

const Collapse: React.FC<CollapseProps> = ({ isOpen, children }) => {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: 'auto',
            opacity: 1,
            transition: {
              height: { duration: 0.3 },
              opacity: { duration: 0.3 },
            },
          }}
          exit={{
            height: 0,
            opacity: 0,
            transition: {
              height: { duration: 0.3 },
              opacity: { duration: 0.2 },
            },
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Collapse;
