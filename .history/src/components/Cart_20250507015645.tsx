
import React from 'react';
import { X } from 'lucide-react';
import { SoundButton } from '@/components/ui/sound-button';
import { playSound } from '@/services/soundService';

interface CartProps {
  cartItems: number[];
  onRemoveFromCart: (number: number) => void;
  onPurchase: () => void;
}

const Cart: React.FC<CartProps> = ({ cartItems, onRemoveFromCart, onPurchase }) => {
  if (cartItems.length === 0) {
    return null;
  }

  const totalAmount = cartItems.length * 50; // Assuming each number costs $50

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="bg-white/10 backdrop-blur-sm p-4 rounded-xl shadow-lg mt-4"
    >
      <h3 className="text-xl font-bold text-white mb-4">Your Cart</h3>
      <div className="flex flex-wrap gap-2 mb-4">
        <AnimatePresence>
          {cartItems.map(item => (
            <motion.div
              key={item}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="bg-game-secondary rounded-lg px-3 py-2 flex items-center gap-2"
            >
              <span className="text-white font-semibold">#{item}</span>
              <button
                onClick={() => {
                  playSound('remove');
                  onRemoveFromCart(item);
                }}
                className="text-white/70 hover:text-white"
              >
                <X size={16} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="flex justify-between items-center border-t border-white/20 pt-3">
        <div>
          <p className="text-white text-sm">Total Amount:</p>
          <p className="text-white font-bold text-xl">${totalAmount}</p>
        </div>
        <SoundButton
          onClick={onPurchase}
          soundEffect="click"
          hoverSound={true}
          className="bg-game-accent hover:bg-game-highlight text-white"
        >
          Proceed to Payment
        </SoundButton>
      </div>
    </motion.div>
  );
};

export default Cart;
