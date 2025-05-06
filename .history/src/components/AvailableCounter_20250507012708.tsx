
import React from 'react';
import { motion } from 'framer-motion';

interface AvailableCounterProps {
  availableCount: number;
  totalCount: number;
}

const AvailableCounter: React.FC<AvailableCounterProps> = ({ availableCount, totalCount }) => {
  const percentage = (availableCount / totalCount) * 100;
  
  return (
    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
      <h3 className="text-lg font-semibold text-white mb-2">Available Numbers</h3>
      <div className="flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-4xl font-bold text-game-accent"
        >
          {availableCount}
        </motion.div>
        <div className="text-white/70">out of {totalCount}</div>
      </div>
      <div className="mt-2 h-3 bg-white/20 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-game-accent"
        ></motion.div>
      </div>
    </div>
  );
};

export default AvailableCounter;
