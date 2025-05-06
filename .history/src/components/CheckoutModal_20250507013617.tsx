
import React, { useState } from 'react';
import { X, CreditCard, Mail } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { SoundButton } from '@/components/ui/sound-button';
import { playSound } from '@/services/soundService';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: number[];
  onCompletePurchase: (email: string) => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onCompletePurchase
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'mobile'>('card');
  const [email, setEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const totalAmount = cartItems.length * 50; // Assuming each number costs $50

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address to receive the purchase confirmation.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    // Play purchase sound
    playSound('purchase');

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onCompletePurchase(email);
      toast({
        title: "Purchase Successful!",
        description: "Your numbers have been purchased. A confirmation has been sent to your email.",
      });
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-game-background border border-game-primary/30 sm:max-w-[500px] max-h-[90vh] overflow-y-auto pb-16 sm:pb-6">
        <DialogHeader>
          <DialogTitle className="text-white text-2xl">Complete Your Purchase</DialogTitle>
          <DialogDescription className="text-white/70">
            You are purchasing {cartItems.length} number{cartItems.length > 1 ? 's' : ''}.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-white/5 p-4 rounded-lg">
            <div className="font-semibold text-white mb-2">Your Numbers:</div>
            <div className="flex flex-wrap gap-2">
              {cartItems.map(item => (
                <div key={item} className="bg-game-secondary text-white px-3 py-1 rounded">
                  #{item}
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-between">
              <span className="text-white/70">Total:</span>
              <span className="text-white font-bold">${totalAmount}</span>
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-white font-medium">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={18} />
              <Input
                type="email"
                placeholder="Your email for receipt"
                className="bg-white/10 border-white/20 text-white pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-white font-medium">Payment Method</div>
            <RadioGroup value={paymentMethod} onValueChange={(value: 'card' | 'mobile') => setPaymentMethod(value)}>
              <div className={`payment-option ${paymentMethod === 'card' ? 'selected' : ''}`}>
                <RadioGroupItem value="card" id="card" className="text-game-accent" />
                <Label htmlFor="card" className="flex items-center text-white cursor-pointer">
                  <CreditCard className="mr-2 h-5 w-5" />
                  Credit/Debit Card
                </Label>
              </div>
              <div className={`payment-option ${paymentMethod === 'mobile' ? 'selected' : ''}`}>
                <RadioGroupItem value="mobile" id="mobile" className="text-game-accent" />
                <Label htmlFor="mobile" className="flex items-center text-white cursor-pointer">
                  <span className="mr-2 text-xl">📱</span>
                  Mobile Money
                </Label>
              </div>
            </RadioGroup>
          </div>

          {paymentMethod === 'card' && (
            <div className="space-y-4 bg-white/5 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-white/70 text-sm mb-1">Card Number</label>
                  <Input className="bg-white/10 border-white/20 text-white" placeholder="**** **** **** ****" />
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-1">Expiry Date</label>
                  <Input className="bg-white/10 border-white/20 text-white" placeholder="MM/YY" />
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-1">CVC</label>
                  <Input className="bg-white/10 border-white/20 text-white" placeholder="123" />
                </div>
              </div>
            </div>
          )}

          {paymentMethod === 'mobile' && (
            <div className="space-y-4 bg-white/5 p-4 rounded-lg">
              <div>
                <label className="block text-white/70 text-sm mb-1">Mobile Number</label>
                <Input className="bg-white/10 border-white/20 text-white" placeholder="Enter your mobile number" />
              </div>
              <div>
                <label className="block text-white/70 text-sm mb-1">Mobile Provider</label>
                <select className="w-full bg-white/10 border-white/20 text-white rounded-md p-2">
                  <option value="">Select Provider</option>
                  <option value="mtn">MTN Mobile Money</option>
                  <option value="airtel">Airtel Money</option>
                  <option value="vodafone">Vodafone Cash</option>
                </select>
              </div>
            </div>
          )}

          <div className="sticky bottom-0 pt-4 bg-game-background mt-6">
            <SoundButton
              type="submit"
              soundEffect="purchase"
              className="w-full bg-game-accent hover:bg-game-highlight text-white py-6 text-lg font-bold"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <span className="flex items-center">
                  <svg className="animate-spin mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing Payment...
                </span>
              ) : (
                'Complete Purchase'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;
