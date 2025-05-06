
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';

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
    
    // Play randomize sound
    const audio = new Audio('/spin-sound.mp3');
    audio.volume = 0.5;
    audio.play().catch(e => console.log('Audio play failed: browser requires user interaction first'));
    
    // Simulate a spinning selection process
    let counter = 0;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * availableNumbers.length);
      const tempNumber = availableNumbers[randomIndex];
      onRandomNumber(tempNumber);
      counter++;
      
      if (counter >= 20) {
        clearInterval(interval);
        setIsAnimating(false);
        
        // Play success sound
        const successAudio = new Audio('/success-sound.mp3');
        successAudio.volume = 0.5;
        successAudio.play().catch(e => console.log('Audio play failed: browser requires user interaction first'));
        
        // Show found toast
        toast({
          title: "Lucky Number Found!",
          description: `You found number ${tempNumber}! Want to purchase it?`,
          variant: "default",
        });
      }
    }, 100);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="w-full"
    >
      <Button
        onClick={handleRandomize}
        disabled={isAnimating || availableNumbers.length === 0}
        className={`w-full text-lg py-6 font-bold ${
          isAnimating ? 'bg-game-secondary' : 'bg-game-accent hover:bg-game-highlight'
        } rounded-xl shadow-lg`}
      >
        <motion.div
          animate={isAnimating ? { rotate: 360 } : { rotate: 0 }}
          transition={{ repeat: isAnimating ? Infinity : 0, duration: 0.5, ease: "linear" }}
          className="mr-2"
        >
          🎲
        </motion.div>
        {isAnimating ? "Finding Lucky Number..." : "Randomize!"}
      </Button>
    </motion.div>
  );
};

export default RandomizeButton;
