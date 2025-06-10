import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { initBackgroundMusic, toggleBackgroundMusic } from '@/services/soundService';
import "./main.css"

const LandingPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Handle start game button click
  const handleStartAudio = () => {
    console.log('Starting audio...');

    // Initialize background music
    initBackgroundMusic();

    // Set loading state to show spinner
    setIsLoading(true);

    // Play a silent sound to unlock audio context
    const silentSound = new Audio();
    silentSound.volume = 0.01;

    silentSound.play()
      .then(() => {
        console.log('Audio context unlocked in LandingPage');

        // Start background music
        if (!toggleBackgroundMusic()) {
          console.log('Failed to toggle background music, trying again...');
          // Try again after a short delay
          setTimeout(() => {
            toggleBackgroundMusic();
          }, 100);
        }

        console.log('Background music started');
      })
      .catch(error => {
        console.error('Error starting audio:', error);

        // Try again with user interaction already registered
        toggleBackgroundMusic();
      });
  };

  return (
    <div id='main-page' className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-game-primary to-game-secondary p-4 text-white relative overflow-x-hidden">
      {/* Hero Section */}
      <div className="absolute inset-0 z-0">
        <img src={require('@/imgs/bg.jpg')} alt="Background" className="w-full h-full object-cover opacity-30 blur-sm" />
      </div>
      <div className="max-w-4xl w-full mx-auto text-center z-10 relative">
        {/* Logo/Header */}
        <div className="mb-8 animate-float">
          <h1 className="text-6xl md:text-8xl font-bold mb-2 text-white drop-shadow-glow tracking-tight">
            200CLUB
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-4">
            Support SembezaAfrica by joining our fundraising campaign!
          </p>
          <Button
            onClick={handleStartAudio}
            disabled={isLoading}
            className="bg-game-accent hover:bg-game-highlight text-white text-xl py-4 px-10 rounded-full shadow-xl transition-all duration-300 transform hover:scale-105 mt-4 animate-bounce"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                Play Game <span className="ml-2">❤️</span>
              </span>
            )}
          </Button>
        </div>

        {/* How It Works Section */}
        <div className="bg-black/40 backdrop-blur-md p-8 rounded-2xl shadow-2xl mb-8 max-w-2xl mx-auto animate-fade-in-up">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 p-4 rounded-xl flex flex-col items-center">
              <div className="text-4xl mb-2">1</div>
              <div className="mb-2 text-game-accent">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" /></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Choose</h3>
              <p>Select your number from the available pool of 200 numbers</p>
            </div>
            <div className="bg-white/10 p-4 rounded-xl flex flex-col items-center">
              <div className="text-4xl mb-2">2</div>
              <div className="mb-2 text-game-accent">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3zm0 0V4m0 8v8" /></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Purchase</h3>
              <p>Secure your number with a donation to support SembezaAfrica</p>
            </div>
            <div className="bg-white/10 p-4 rounded-xl flex flex-col items-center">
              <div className="text-4xl mb-2">3</div>
              <div className="mb-2 text-game-accent">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m4 4h-1a2 2 0 01-2-2V7a2 2 0 012-2h1a2 2 0 012 2v7a2 2 0 01-2 2z" /></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Impact</h3>
              <p>Your contribution helps fund vital programs for communities in need</p>
            </div>
          </div>

          {/* Impact/Testimonial Section */}
          <div className="bg-game-accent/10 p-4 rounded-lg mb-6 animate-fade-in">
            <blockquote className="italic text-lg text-white/90">“My donation through 200 Club helped provide clean water to a village in Uganda. Every number truly makes a difference!”</blockquote>
            <div className="mt-2 text-right text-game-accent font-semibold">— A Supporter</div>
          </div>

          {/* About Section */}
          <div className="mb-8 animate-fade-in-up">
            <h3 className="text-2xl font-bold mb-2">About SembezaAfrica</h3>
            <div className="bg-game-accent/30 p-4 rounded-lg mb-4 border-l-4 border-game-accent">
              <p className="font-semibold text-lg mb-1 text-game-accent">Our Mission</p>
              <p className="text-white/90">To improve lives through sustainable community development, education, and healthcare initiatives.</p>
            </div>
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
              className="bg-game-accent hover:bg-game-highlight text-white text-xl py-6 px-8 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 w-full mt-2 animate-fade-in"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  Play Game <span className="ml-2">❤️</span>
                </span>
              )}
            </Button>
          </Link>
        </div>

        {/* Footer */}
        <div className="text-white/70 mt-8 flex flex-col items-center gap-2 animate-fade-in-up">
          <div className="flex gap-4 mb-2">
            {/* Social Media Icons Placeholder */}
            <span className="hover:text-game-accent cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.59-2.47.7a4.3 4.3 0 001.88-2.37 8.59 8.59 0 01-2.72 1.04A4.28 4.28 0 0016.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 9.13 4.07 7.38 1.64 4.7c-.37.64-.58 1.38-.58 2.17 0 1.5.76 2.82 1.92 3.6-.71-.02-1.38-.22-1.97-.54v.05c0 2.1 1.5 3.85 3.5 4.25-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.7 2.1 2.94 3.95 2.97A8.6 8.6 0 012 19.54c-.29 0-.57-.02-.85-.05A12.13 12.13 0 006.29 21c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.18 8.18 0 0024 4.59a8.36 8.36 0 01-2.54.7z" /></svg></span>
            <span className="hover:text-game-accent cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96 0 4.41 3.6 8.07 8.24 8.93v-6.32h-2.48v-2.61h2.48v-2c0-2.45 1.49-3.8 3.68-3.8 1.07 0 2.19.19 2.19.19v2.41h-1.24c-1.22 0-1.6.76-1.6 1.54v1.66h2.72l-.44 2.61h-2.28v6.32c4.64-.86 8.24-4.52 8.24-8.93 0-5.5-4.46-9.96-9.96-9.96z" /></svg></span>
            <span className="hover:text-game-accent cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M21.35 11.1c.04.28.04.56.04.84 0 8.6-6.55 18.52-18.52 18.52-3.68 0-7.1-1.08-9.98-2.94.51.06 1.02.08 1.54.08 3.06 0 5.87-1.04 8.1-2.8-2.86-.05-5.27-1.94-6.1-4.54.4.07.8.11 1.22.11.59 0 1.16-.08 1.7-.23-2.99-.6-5.24-3.24-5.24-6.41v-.08c.88.49 1.89.79 2.96.82-1.76-1.18-2.92-3.19-2.92-5.47 0-1.2.32-2.32.88-3.29 3.2 3.93 7.98 6.5 13.37 6.77-.11-.48-.17-.98-.17-1.5 0-3.6 2.92-6.52 6.52-6.52 1.88 0 3.58.8 4.77 2.09 1.49-.29 2.89-.84 4.15-1.6-.49 1.53-1.53 2.81-2.88 3.62 1.32-.16 2.58-.51 3.75-1.03-.88 1.31-2 2.47-3.28 3.39z" /></svg></span>
          </div>
          <p>&copy; {new Date().getFullYear()} 200 Club by SembezaAfrica. All rights reserved.</p>
          <p className="text-sm mt-2">100% of proceeds go to SembezaAfrica's community programs. Terms and conditions apply.</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
