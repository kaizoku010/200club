
// Audio files
const SOUNDS = {
  select: '/sounds/select-sound.mp3',
  spin: '/sounds/spin-sound.mp3',
  success: '/sounds/success-sound.mp3',
  purchase: '/sounds/purchase-sound.mp3',
  click: '/sounds/click-sound.mp3',
  buttonHover: '/sounds/button-hover.mp3',
  casinoSpin: '/sounds/casion-spin.mp3', // Note: fixing typo in filename
  jackpot: '/sounds/jackpot.mp3',
  remove: '/sounds/remove-sound.mp3',
};

// Volume settings
const VOLUME = {
  select: 0.3,
  spin: 0.5,
  success: 0.5,
  purchase: 0.5,
  click: 0.2,
  buttonHover: 0.1,
  casinoSpin: 0.4,
  jackpot: 0.6,
  remove: 0.3,
  music: 0.3, // Background music volume
};

// Playing sound flags to prevent multiple plays
let isPlaying: Record<string, boolean> = {
  select: false,
  spin: false,
  success: false,
  purchase: false,
  click: false,
  buttonHover: false,
  casinoSpin: false,
  jackpot: false,
  remove: false,
};

// Sound enabled state
let soundEnabled = true;
let musicEnabled = true;

// Background music instance
let backgroundMusic: HTMLAudioElement | null = null;

// Initialize background music
export const initBackgroundMusic = (): void => {
  if (backgroundMusic) return;

  backgroundMusic = new Audio('/background-music.mp3');
  backgroundMusic.loop = true;
  backgroundMusic.volume = VOLUME.music;

  // Auto-restart if ended somehow despite loop=true
  backgroundMusic.onended = () => {
    if (musicEnabled && backgroundMusic) {
      backgroundMusic.currentTime = 0;
      backgroundMusic.play().catch(error => {
        console.log(`Background music play failed: ${error.message}`);
      });
    }
  };
};

// Play or pause background music
export const toggleBackgroundMusic = (): boolean => {
  if (!backgroundMusic) {
    initBackgroundMusic();
  }

  if (!backgroundMusic) return false;

  if (musicEnabled) {
    backgroundMusic.pause();
    musicEnabled = false;
  } else {
    backgroundMusic.play().catch(error => {
      console.log(`Background music play failed: ${error.message}`);
    });
    musicEnabled = true;
  }

  return musicEnabled;
};

// Set background music volume
export const setMusicVolume = (volume: number): void => {
  VOLUME.music = Math.max(0, Math.min(1, volume));
  if (backgroundMusic) {
    backgroundMusic.volume = VOLUME.music;
  }
};

// Toggle all sound effects
export const toggleSoundEffects = (): boolean => {
  soundEnabled = !soundEnabled;
  return soundEnabled;
};

// Check if sound is enabled
export const isSoundEnabled = (): boolean => soundEnabled;

// Check if music is enabled
export const isMusicEnabled = (): boolean => musicEnabled;

// Play sound with proper error handling
export const playSound = (soundName: keyof typeof SOUNDS): void => {
  // Skip if sound is disabled or already playing this sound
  if (!soundEnabled || isPlaying[soundName]) return;

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
