
// In a real app, this would connect to a database to track available and purchased numbers

// Local storage keys
const PURCHASED_NUMBERS_KEY = 'purchasedNumbers';
const USER_CART_KEY = 'userCart';

// Initialize purchased numbers from local storage or default to empty array
const initializePurchasedNumbers = (): number[] => {
  const storedNumbers = localStorage.getItem(PURCHASED_NUMBERS_KEY);
  return storedNumbers ? JSON.parse(storedNumbers) : [];
};

// Initialize cart from local storage or default to empty array
const initializeCart = (): number[] => {
  const storedCart = localStorage.getItem(USER_CART_KEY);
  return storedCart ? JSON.parse(storedCart) : [];
};

// Get all available numbers (1-200 excluding purchased ones)
export const getAvailableNumbers = (): number[] => {
  const purchasedNumbers = initializePurchasedNumbers();
  return Array.from({ length: 200 }, (_, i) => i + 1)
    .filter(num => !purchasedNumbers.includes(num));
};

// Get purchased numbers
export const getPurchasedNumbers = (): number[] => {
  return initializePurchasedNumbers();
};

// Get cart items
export const getCartItems = (): number[] => {
  return initializeCart();
};

// Add number to cart
export const addToCart = (number: number): void => {
  const cart = initializeCart();
  if (!cart.includes(number)) {
    const updatedCart = [...cart, number];
    localStorage.setItem(USER_CART_KEY, JSON.stringify(updatedCart));
  }
};

// Remove number from cart
export const removeFromCart = (number: number): void => {
  const cart = initializeCart();
  const updatedCart = cart.filter(item => item !== number);
  localStorage.setItem(USER_CART_KEY, JSON.stringify(updatedCart));
};

// Clear cart
export const clearCart = (): void => {
  localStorage.setItem(USER_CART_KEY, JSON.stringify([]));
};

// Purchase numbers (move from cart to purchased)
export const purchaseNumbers = (numbers: number[], email: string): void => {
  const purchasedNumbers = initializePurchasedNumbers();
  const updatedPurchasedNumbers = [...purchasedNumbers, ...numbers];
  
  localStorage.setItem(PURCHASED_NUMBERS_KEY, JSON.stringify(updatedPurchasedNumbers));
  clearCart();
  
  // In a real app, this would send an email with purchase confirmation
  console.log(`Email sent to ${email} for numbers: ${numbers.join(', ')}`);
};

// Send confirmation email (mock function)
export const sendConfirmationEmail = (email: string, numbers: number[]): void => {
  // This would connect to a real email service in production
  console.log(`Sending confirmation email to ${email} for numbers: ${numbers.join(', ')}`);
};
