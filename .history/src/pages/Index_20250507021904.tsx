
import React, { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import NumberGrid from '@/components/NumberGrid';
import RandomizeButton from '@/components/RandomizeButton';
import SelectedNumber, { MobilePurchaseButton } from '@/components/SelectedNumber';
import Cart from '@/components/Cart';
import CheckoutModal from '@/components/CheckoutModal';
import AvailableCounter from '@/components/AvailableCounter';
import SoundControls from '@/components/SoundControls';
import {
  getAvailableNumbers,
  getPurchasedNumbers,
  getCartItems,
  addToCart,
  removeFromCart,
  purchaseNumbers,
  sendConfirmationEmail
} from '@/services/numberService';
import {
  playSound,
  initBackgroundMusic,
  toggleBackgroundMusic,
  isMusicEnabled
} from '@/services/soundService';

const Index: React.FC = () => {
  const [availableNumbers, setAvailableNumbers] = useState<number[]>([]);
  const [purchasedNumbers, setPurchasedNumbers] = useState<number[]>([]);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [cartItems, setCartItems] = useState<number[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);

  // Load initial data from service
  useEffect(() => {
    setAvailableNumbers(getAvailableNumbers());
    setPurchasedNumbers(getPurchasedNumbers());
    setCartItems(getCartItems());

    // Initialize background music
    initBackgroundMusic();
  }, []);

  // Handle number selection
  const handleNumberSelected = (number: number) => {
    setSelectedNumber(number);
    playSound('select');
  };

  // Handle adding to cart
  const handleAddToCart = () => {
    if (selectedNumber) {
      addToCart(selectedNumber);
      setCartItems([...cartItems, selectedNumber]);
      setSelectedNumber(null);
      playSound('success');

      // Update available numbers
      const updatedAvailable = availableNumbers.filter(num => num !== selectedNumber);
      setAvailableNumbers(updatedAvailable);
    }
  };

  // Handle removing from cart
  const handleRemoveFromCart = (number: number) => {
    removeFromCart(number);
    setCartItems(cartItems.filter(item => item !== number));

    // Add back to available numbers
    setAvailableNumbers([...availableNumbers, number]);
  };

  // Handle checkout
  const handleCheckout = () => {
    if (cartItems.length > 0) {
      setIsCheckoutOpen(true);
    }
  };

  // Handle purchase completion
  const handleCompletePurchase = (email: string) => {
    purchaseNumbers(cartItems, email);
    setPurchasedNumbers([...purchasedNumbers, ...cartItems]);
    setCartItems([]);
    setIsCheckoutOpen(false);
    playSound('purchase');

    // In a real app, this would trigger an email service
    sendConfirmationEmail(email, cartItems);
  };

  return (
    <div className="min-h-screen flex flex-col bg-game-background text-white">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <div className="bg-white/5 rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Choose Your Lucky Number</h2>
              <div className="mb-6">
                <RandomizeButton
                  availableNumbers={availableNumbers}
                  onRandomNumber={handleNumberSelected}
                />
              </div>
              <NumberGrid
                availableNumbers={availableNumbers}
                selectedNumber={selectedNumber}
                purchasedNumbers={purchasedNumbers}
                onNumberSelected={handleNumberSelected}
              />
            </div>
          </div>

          <div className="space-y-6">
            <AvailableCounter
              availableCount={availableNumbers.length}
              totalCount={200}
            />

            {selectedNumber && (
              <SelectedNumber
                selectedNumber={selectedNumber}
                onPurchase={handleAddToCart}
                onCancel={() => setSelectedNumber(null)}
              />
            )}

            {cartItems.length > 0 && (
              <div ref={cartRef}>
                <Cart
                  cartItems={cartItems}
                  onRemoveFromCart={handleRemoveFromCart}
                  onPurchase={handleCheckout}
                />
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-game-background border-t border-white/10 py-4">
        <div className="container mx-auto px-4 text-center text-white/60">
          &copy; {new Date().getFullYear()} 200 Club by semebzaAfrica. All rights reserved.
        </div>
      </footer>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onCompletePurchase={handleCompletePurchase}
      />

      {selectedNumber && (
        <MobilePurchaseButton
          selectedNumber={selectedNumber}
          onPurchase={handleAddToCart}
          cartRef={cartRef}
        />
      )}

      {/* Sound Controls */}
      <SoundControls />
    </div>
  );
};

export default Index;
