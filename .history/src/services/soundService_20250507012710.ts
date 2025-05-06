
// Audio files
const SOUNDS = {
  select: '/select-sound.mp3',
  spin: '/spin-sound.mp3',
  success: '/success-sound.mp3',
  purchase: '/purchase-sound.mp3',
};

// Volume settings
const VOLUME = {
  select: 0.3,
  spin: 0.5,
  success: 0.5,
  purchase: 0.5,
};

// Playing sound flags to prevent multiple plays
let isPlaying: Record<string, boolean> = {
  select: false,
  spin: false,
  success: false,
  purchase: false,
};

// Play sound with proper error handling
export const playSound = (soundName: keyof typeof SOUNDS): void => {
  // Skip if already playing this sound
  if (isPlaying[soundName]) return;
  
  const audio = new Audio(SOUNDS[soundName]);
  audio.volume = VOLUME[soundName];
  
  isPlaying[soundName] = true;
  
  // Reset the flag when sound ends
  audio.onended = () => {
    isPlaying[soundName] = false;
  };
  
  audio.play().catch(error => {
    console.log(`Audio play failed: ${error.message}`);
    isPlaying[soundName] = false;
  });
};
