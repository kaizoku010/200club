import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { playSound, toggleBackgroundMusic, isMusicEnabled } from '@/services/soundService';
import { cn } from '@/lib/utils';

interface SoundButtonProps extends ButtonProps {
  soundEffect?: 'click' | 'select' | 'success' | 'purchase';
  hoverSound?: boolean;
}

const SoundButton = React.forwardRef<HTMLButtonElement, SoundButtonProps>(
  ({ className, soundEffect = 'click', hoverSound = false, onMouseEnter, onClick, ...props }, ref) => {

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (hoverSound) {
        playSound('buttonHover');
      }

      if (onMouseEnter) {
        onMouseEnter(e);
      }
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      // Play the button sound effect
      playSound(soundEffect);

      // This is a good opportunity to start background music if it's enabled
      // but not playing yet (due to browser autoplay restrictions)
      if (isMusicEnabled()) {
        // Try to start background music now that we have user interaction
        toggleBackgroundMusic();
        toggleBackgroundMusic(); // Toggle twice to ensure it's playing if enabled
      }

      if (onClick) {
        onClick(e);
      }
    };

    return (
      <Button
        ref={ref}
        className={cn(className)}
        onMouseEnter={handleMouseEnter}
        onClick={handleClick}
        {...props}
      />
    );
  }
);

SoundButton.displayName = 'SoundButton';

export { SoundButton };
