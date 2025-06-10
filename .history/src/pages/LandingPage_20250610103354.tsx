import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import semLogo from '@/../public/sem_logo.png';
import bgImg from '../imgs/bg.jpg';
import './main.css';

const LandingPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Optional: handle audio if needed
  const handleStart = () => setIsLoading(true);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-game-primary to-game-secondary relative">
      {/* Background image overlay */}
      <div className="absolute inset-0 -z-10">
        <img src={bgImg} alt="Background" className="w-full h-full object-cover opacity-20" />
      </div>

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 bg-transparent">
        <div className="flex items-center gap-3">
          <img src={semLogo} alt="SembezaAfrica Logo" className="h-12 w-12 rounded-full shadow-lg" />
          <span className="text-2xl font-bold text-white tracking-tight">SembezaAfrica</span>
        </div>
        <div className="flex gap-6 text-white/80 font-medium">
          <a href="#features" className="hover:text-game-accent transition">Features</a>
          <a href="#about" className="hover:text-game-accent transition">About</a>
          <a href="#impact" className="hover:text-game-accent transition">Impact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section id='hero-section' className="flex flex-col items-center justify-center text-center py-20 px-4">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-glow mb-6">Make an Impact. <span className="text-game-accent">Join 200 Club</span></h1>
        <p className="text-xl md:text-2xl text-white/80 max-w-2xl mb-8">Support SembezaAfrica's mission to empower communities through education, healthcare, and sustainable development. Every number purchased changes a life.</p>
        <Link to="/game">
          <Button
            onClick={handleStart}
            disabled={isLoading}
            className="bg-game-accent hover:bg-game-highlight text-white text-xl py-4 px-10 rounded-full shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            {isLoading ? 'Loading...' : 'Get Started'}
          </Button>
        </Link>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-5xl mx-auto py-16 px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white/10 rounded-xl p-8 flex flex-col items-center text-center shadow-lg">
          <div className="mb-4 text-game-accent">
            <svg className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3zm0 0V4m0 8v8" /></svg>
          </div>
          <h3 className="text-xl font-bold mb-2 text-white">Easy Participation</h3>
          <p className="text-white/80">Pick your lucky number from 1-200 and join the club in seconds.</p>
        </div>
        <div className="bg-white/10 rounded-xl p-8 flex flex-col items-center text-center shadow-lg">
          <div className="mb-4 text-game-accent">
            <svg className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 20h9" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m0 0H3" /></svg>
          </div>
          <h3 className="text-xl font-bold mb-2 text-white">Transparent Giving</h3>
          <p className="text-white/80">100% of your donation goes directly to SembezaAfrica's community programs.</p>
        </div>
        <div className="bg-white/10 rounded-xl p-8 flex flex-col items-center text-center shadow-lg">
          <div className="mb-4 text-game-accent">
            <svg className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          </div>
          <h3 className="text-xl font-bold mb-2 text-white">Real Impact</h3>
          <p className="text-white/80">Your support funds clean water, education, and healthcare for those in need.</p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-black/40 py-16 px-4 flex flex-col items-center">
        <h2 className="text-3xl font-bold text-white mb-4">About SembezaAfrica</h2>
        <p className="text-lg text-white/80 max-w-2xl mb-6">SembezaAfrica is a non-profit organization dedicated to improving lives in Africa through sustainable community development, education, and healthcare initiatives. We believe in the power of collective action to create lasting change.</p>
        <div className="bg-game-accent/20 rounded-lg p-6 max-w-xl text-white/90">
          <span className="font-semibold text-game-accent">Our Mission:</span> Empower communities, one number at a time.
        </div>
      </section>

      {/* Impact/Testimonial Section */}
      <section id="impact" className="py-16 px-4 flex flex-col items-center bg-gradient-to-t from-game-secondary to-transparent">
        <h2 className="text-3xl font-bold text-white mb-8">What Our Supporters Say</h2>
        <div className="max-w-2xl w-full">
          <div className="bg-white/10 rounded-xl p-8 mb-6 shadow-md">
            <blockquote className="italic text-lg text-white/90">“Thanks to 200 Club, my village now has access to clean water. I never thought a small donation could make such a big difference!”</blockquote>
            <div className="mt-4 text-right text-game-accent font-semibold">— Grace, Uganda</div>
          </div>
          <div className="bg-white/10 rounded-xl p-8 shadow-md">
            <blockquote className="italic text-lg text-white/90">“SembezaAfrica is truly changing lives. I’m proud to be a part of this movement.”</blockquote>
            <div className="mt-4 text-right text-game-accent font-semibold">— John, Kenya</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/70 py-8 px-4 flex flex-col items-center mt-auto">
        <div className="flex gap-4 mb-4">
          {/* Social Media Icons Placeholder */}
          <a href="#" className="hover:text-game-accent text-white/70"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.59-2.47.7a4.3 4.3 0 001.88-2.37 8.59 8.59 0 01-2.72 1.04A4.28 4.28 0 0016.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 9.13 4.07 7.38 1.64 4.7c-.37.64-.58 1.38-.58 2.17 0 1.5.76 2.82 1.92 3.6-.71-.02-1.38-.22-1.97-.54v.05c0 2.1 1.5 3.85 3.5 4.25-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.7 2.1 2.94 3.95 2.97A8.6 8.6 0 012 19.54c-.29 0-.57-.02-.85-.05A12.13 12.13 0 006.29 21c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.18 8.18 0 0024 4.59a8.36 8.36 0 01-2.54.7z" /></svg></a>
          <a href="#" className="hover:text-game-accent text-white/70"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96 0 4.41 3.6 8.07 8.24 8.93v-6.32h-2.48v-2.61h2.48v-2c0-2.45 1.49-3.8 3.68-3.8 1.07 0 2.19.19 2.19.19v2.41h-1.24c-1.22 0-1.6.76-1.6 1.54v1.66h2.72l-.44 2.61h-2.28v6.32c4.64-.86 8.24-4.52 8.24-8.93 0-5.5-4.46-9.96-9.96-9.96z" /></svg></a>
          <a href="#" className="hover:text-game-accent text-white/70"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M21.35 11.1c.04.28.04.56.04.84 0 8.6-6.55 18.52-18.52 18.52-3.68 0-7.1-1.08-9.98-2.94.51.06 1.02.08 1.54.08 3.06 0 5.87-1.04 8.1-2.8-2.86-.05-5.27-1.94-6.1-4.54.4.07.8.11 1.22.11.59 0 1.16-.08 1.7-.23-2.99-.6-5.24-3.24-5.24-6.41v-.08c.88.49 1.89.79 2.96.82-1.76-1.18-2.92-3.19-2.92-5.47 0-1.2.32-2.32.88-3.29 3.2 3.93 7.98 6.5 13.37 6.77-.11-.48-.17-.98-.17-1.5 0-3.6 2.92-6.52 6.52-6.52 1.88 0 3.58.8 4.77 2.09 1.49-.29 2.89-.84 4.15-1.6-.49 1.53-1.53 2.81-2.88 3.62 1.32-.16 2.58-.51 3.75-1.03-.88 1.31-2 2.47-3.28 3.39z" /></svg></a>
        </div>
        <p className="text-white/60">&copy; {new Date().getFullYear()} 200 Club by SembezaAfrica. All rights reserved.</p>
        <p className="text-sm text-white/40 mt-2">100% of proceeds go to SembezaAfrica's community programs. Terms and conditions apply.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
