
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { SoundButton } from '@/components/ui/sound-button';
import { playSound } from '@/services/soundService';

interface RandomizeButtonProps {
  availableNumbers: number[];
  onRandomNumber: (number: number) => void;
}

const RandomizeButton: React.FC<RandomizeButtonProps> = ({ availableNumbers, onRandomNumber }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const { toast } = useToast();

  const handleRandomize = () => {
    if (availableNumbers.length === 0) {
      toast({
        title: "No numbers available",
        description: "All numbers have been purchased!",
        variant: "destructive",
      });
      return;
    }

    setIsAnimating(true);

    // Play casino spin sound
    playSound('casinoSpin');

    // Simulate a spinning selection process
    let counter = 0;
    const spinInterval = 100; // ms between spins

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * availableNumbers.length);
      const tempNumber = availableNumbers[randomIndex];
      onRandomNumber(tempNumber);
      counter++;

      // Play tick sound every few spins
      if (counter % 3 === 0) {
        playSound('spin');
      }

      if (counter >= 20) {
        clearInterval(interval);
        setIsAnimating(false);

        // Play jackpot sound when finished
        playSound('jackpot');

        // Show found toast
        toast({
          title: "Number Selected!",
          description: `You found number ${tempNumber}! Want to support SembezaAfrica with this number?`,
          variant: "default",
        });
      }
    }, spinInterval);
  };

  return (
    <div className="w-full">
      <SoundButton
        onClick={handleRandomize}
        disabled={isAnimating || availableNumbers.length === 0}
        soundEffect="click"
        hoverSound={true}
        className={`w-full text-lg py-6 font-bold ${
          isAnimating ? 'bg-game-secondary' : 'bg-game-accent hover:bg-game-highlight'
        } rounded-xl shadow-lg`}
      >
        <div
          className={`mr-2 inline-block ${isAnimating ? 'animate-spin' : ''}`}
        >
          🎲
        </div>
        {isAnimating ? "Finding Your Number..." : "Pick Random Number!"}
      </SoundButton>
    </div>
  );
};

export default RandomizeButton;
