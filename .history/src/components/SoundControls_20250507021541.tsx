import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, Music, Music2, Play } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { playSound } from '@/services/soundService';
import {
  toggleSoundEffects,
  toggleBackgroundMusic,
  setMusicVolume,
  isSoundEnabled,
  isMusicEnabled,
  initBackgroundMusic
} from '@/services/soundService';

const SoundControls: React.FC = () => {
  const [soundOn, setSoundOn] = useState(true);
  const [musicOn, setMusicOn] = useState(true);
  const [volume, setVolume] = useState(0.3);
  const [audioStarted, setAudioStarted] = useState(false);

  // Initialize background music on component mount
  useEffect(() => {
    // Only initialize, don't play yet (to avoid autoplay policy issues)
    initBackgroundMusic();
    console.log('Background music initialized in SoundControls component');
  }, []);

  // Toggle sound effects
  const handleToggleSound = () => {
    const isEnabled = toggleSoundEffects();
    setSoundOn(isEnabled);
  };

  // Toggle background music
  const handleToggleMusic = () => {
    const isEnabled = toggleBackgroundMusic();
    setMusicOn(isEnabled);
  };

  // Handle volume change
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    setMusicVolume(newVolume);
  };

  // Start audio context to handle browser autoplay policy
  const handleStartAudio = () => {
    // Play a silent sound to unlock the audio context
    const audio = new Audio();
    audio.play().then(() => {
      console.log('Audio context started successfully');
      setAudioStarted(true);

      // Try to play a test sound
      playSound('click');

      // Try to start background music if it's enabled
      if (musicOn) {
        toggleBackgroundMusic();
      }
    }).catch(error => {
      console.error('Failed to start audio context:', error);
    });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-black/50 backdrop-blur-sm p-3 rounded-lg shadow-lg flex flex-col gap-2 animate-fadeIn"
    >
      {!audioStarted ? (
        // Show start audio button if audio hasn't been started yet
        <Button
          variant="default"
          onClick={handleStartAudio}
          className="bg-game-accent hover:bg-game-highlight text-white"
        >
          <Play size={16} className="mr-2" />
          Start Audio
        </Button>
      ) : (
        // Show audio controls once audio has been started
        <>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleToggleSound}
              className="text-white hover:bg-white/20"
            >
              {soundOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleToggleMusic}
              className="text-white hover:bg-white/20"
            >
              {musicOn ? <Music size={18} /> : <Music2 size={18} />}
            </Button>
          </div>

          {musicOn && (
            <div className="w-24 px-1">
              <Slider
                defaultValue={[volume]}
                max={1}
                step={0.01}
                onValueChange={handleVolumeChange}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SoundControls;
