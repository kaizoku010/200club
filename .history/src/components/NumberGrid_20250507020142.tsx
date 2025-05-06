
import React from 'react';
import { cn } from '@/lib/utils';
import { playSound } from '@/services/soundService';

interface NumberGridProps {
  availableNumbers: number[];
  selectedNumber: number | null;
  purchasedNumbers: number[];
  onNumberSelected: (number: number) => void;
}

const NumberGrid: React.FC<NumberGridProps> = ({
  availableNumbers,
  selectedNumber,
  purchasedNumbers,
  onNumberSelected
}) => {
  const allNumbers = Array.from({ length: 200 }, (_, i) => i + 1);

  const isNumberAvailable = (num: number) => availableNumbers.includes(num);
  const isNumberPurchased = (num: number) => purchasedNumbers.includes(num);
  const isNumberSelected = (num: number) => selectedNumber === num;

  return (
    <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2 md:gap-3">
      {allNumbers.map(number => (
        <motion.div
          key={number}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: number * 0.001 }}
          className={cn(
            "number-card",
            isNumberPurchased(number) && "purchased",
            isNumberSelected(number) && "selected",
            !isNumberAvailable(number) && !isNumberPurchased(number) && "purchased"
          )}
          onClick={() => {
            if (isNumberAvailable(number) && !isNumberPurchased(number)) {
              onNumberSelected(number);
              // Play select sound
              playSound('select');
            }
          }}
        >
          {number}
        </motion.div>
      ))}
    </div>
  );
};

export default NumberGrid;
