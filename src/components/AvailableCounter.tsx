
import React from 'react';

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
        <div className="text-4xl font-bold text-game-accent animate-fadeIn">
          {availableCount}
        </div>
        <div className="text-white/70">out of {totalCount}</div>
      </div>
      <div className="mt-2 h-3 bg-white/20 rounded-full overflow-hidden">
        <div
          className="h-full bg-game-accent animate-progressBar"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default AvailableCounter;
