
import React from 'react';
import { useToast } from '@/components/ui/use-toast';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-game-primary to-game-secondary p-4 shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            200 Club
          </h1>
          <p className="text-white/80">by semebzaAfrica</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-white/10 p-2 px-4 rounded-full backdrop-blur-sm">
            <span className="text-white font-medium">Your lucky numbers await!</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
