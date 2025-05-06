import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { initBackgroundMusic, toggleBackgroundMusic } from '@/services/soundService';

const LandingPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Handle start game button click
  const handleStartAudio = () => {
    console.log('Starting audio...');

    // Initialize and start background music
    initBackgroundMusic();

    // Try to play a silent sound to unlock audio context
    try {
      // Start background music immediately
      toggleBackgroundMusic();
      console.log('Background music started');
    } catch (error) {
      console.error('Error starting audio:', error);
    }

    // Set loading state to show spinner
    setIsLoading(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-game-primary to-game-secondary p-4 text-white">
      <div className="max-w-4xl w-full mx-auto text-center">
        {/* Logo/Header */}
        <div className="mb-8 animate-float">
          <h1 className="text-6xl md:text-8xl font-bold mb-2 text-white drop-shadow-glow">
            200CLUB
          </h1>
          <p className="text-xl md:text-2xl text-white/80">
            Support SembezaAfrica by joining our fundraising campaign!
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-black/30 backdrop-blur-sm p-8 rounded-2xl shadow-2xl mb-8 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 p-4 rounded-xl">
              <div className="text-4xl mb-2">1</div>
              <h3 className="text-xl font-semibold mb-2">Choose</h3>
              <p>Select your number from the available pool of 200 numbers</p>
            </div>

            <div className="bg-white/10 p-4 rounded-xl">
              <div className="text-4xl mb-2">2</div>
              <h3 className="text-xl font-semibold mb-2">Purchase</h3>
              <p>Secure your number with a donation to support SembezaAfrica</p>
            </div>

            <div className="bg-white/10 p-4 rounded-xl">
              <div className="text-4xl mb-2">3</div>
              <h3 className="text-xl font-semibold mb-2">Impact</h3>
              <p>Your contribution helps fund vital programs for communities in need</p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-2">About SembezaAfrica</h3>
            <p className="text-lg mb-4">
              SembezaAfrica is a non-profit organization dedicated to improving lives through sustainable community development, education, and healthcare initiatives.
            </p>
            <div className="bg-game-accent/20 p-4 rounded-lg mb-4">
              <p className="font-semibold mb-2">Our Fundraising Goal:</p>
              <p>100% of your contributions go directly to supporting vital programs that help communities in need.</p>
            </div>
            <p className="text-sm italic">Join us in making a difference - every number purchased helps change lives!</p>
          </div>

          <Link to="/game">
            <Button
              onClick={handleStartAudio}
              disabled={isLoading}
              className="bg-game-accent hover:bg-game-highlight text-white text-xl py-6 px-8 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading...
                </span>
              ) : (
                <span className="flex items-center">
                  Play Game <span className="ml-2">❤️</span>
                </span>
              )}
            </Button>
          </Link>
        </div>

        {/* Footer */}
        <div className="text-white/60">
          <p>&copy; {new Date().getFullYear()} 200 Club by SembezaAfrica. All rights reserved.</p>
          <p className="text-sm mt-2">100% of proceeds go to SembezaAfrica's community programs. Terms and conditions apply.</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
