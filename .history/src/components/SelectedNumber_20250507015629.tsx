
import React, { useRef } from 'react';
import { ShoppingCart } from 'lucide-react';
import { SoundButton } from '@/components/ui/sound-button';
import { playSound } from '@/services/soundService';

interface SelectedNumberProps {
  selectedNumber: number | null;
  onPurchase: () => void;
  onCancel: () => void;
}

const SelectedNumber: React.FC<SelectedNumberProps> = ({ selectedNumber, onPurchase, onCancel }) => {
  if (selectedNumber === null) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-game-primary to-game-secondary p-6 rounded-xl shadow-xl text-center animate-fadeIn">
      <h3 className="text-xl font-bold text-white mb-2">Selected Number</h3>
      <div className="text-6xl font-bold text-white my-4 animate-pulse">
        {selectedNumber}
      </div>
      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
        <SoundButton
          onClick={onPurchase}
          soundEffect="success"
          hoverSound={true}
          className="bg-game-accent hover:bg-game-highlight text-white"
        >
          Purchase This Number
        </SoundButton>
        <SoundButton
          onClick={onCancel}
          soundEffect="click"
          variant="outline"
          className="border-white text-white hover:bg-white/20"
        >
          Cancel
        </SoundButton>
      </div>
    </motion.div>
  );
};

// Create a fixed purchase button that appears on mobile when a number is selected
export const MobilePurchaseButton: React.FC<{
  selectedNumber: number | null;
  onPurchase: () => void;
  cartRef?: React.RefObject<HTMLDivElement>;
}> = ({ selectedNumber, onPurchase, cartRef }) => {
  if (selectedNumber === null) {
    return null;
  }

  const handlePurchase = () => {
    onPurchase();

    // Scroll to cart after a short delay to ensure the cart is rendered
    setTimeout(() => {
      if (cartRef && cartRef.current) {
        cartRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="md:hidden fixed bottom-4 left-0 right-0 z-50 px-4 animate-slideUp"
    >
      <SoundButton
        onClick={handlePurchase}
        soundEffect="success"
        hoverSound={true}
        className="w-full bg-game-accent hover:bg-game-highlight text-white py-6 text-lg font-bold shadow-lg"
      >
        <ShoppingCart className="mr-2" />
        Purchase #{selectedNumber}
      </SoundButton>
    </motion.div>
  );
};

export default SelectedNumber;
