
// Audio files
const SOUNDS = {
  select: '/sounds/select-sound.mp3',
  spin: '/sounds/spin-sound.mp3',
  success: '/sounds/success-sound.mp3',
  purchase: '/sounds/purchase-sound.mp3',
  click: '/sounds/click-sound.mp3',
  buttonHover: '/sounds/button-hover.mp3',
  casinoSpin: '/sounds/casino-spin.mp3',
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

  console.log('Initializing background music');
  backgroundMusic = new Audio('/sounds/background-music.mp3');
  backgroundMusic.loop = true;
  backgroundMusic.volume = VOLUME.music;

  // Auto-restart if ended somehow despite loop=true
  backgroundMusic.onended = () => {
    console.log('Background music ended (unexpected with loop=true)');
    if (musicEnabled && backgroundMusic) {
      backgroundMusic.currentTime = 0;
      backgroundMusic.play().then(() => {
        console.log('Background music restarted successfully');
      }).catch(error => {
        console.error(`Background music restart failed: ${error.message}`);
      });
    }
  };

  console.log('Background music initialized successfully');
};

// Play or pause background music
export const toggleBackgroundMusic = (): boolean => {
  console.log('Toggling background music');

  if (!backgroundMusic) {
    console.log('Background music not initialized, initializing now');
    initBackgroundMusic();
  }

  if (!backgroundMusic) {
    console.error('Failed to initialize background music');
    return false;
  }

  if (musicEnabled) {
    console.log('Pausing background music');
    backgroundMusic.pause();
    musicEnabled = false;
  } else {
    console.log('Playing background music');

    // Create a user interaction context by playing a silent sound first
    const silentSound = new Audio();
    silentSound.volume = 0.01;

    // Try to play the silent sound first to establish user interaction
    silentSound.play()
      .then(() => {
        // Now try to play the background music
        return backgroundMusic.play();
      })
      .then(() => {
        console.log('Background music started playing successfully');
      })
      .catch(error => {
        console.error(`Background music play failed: ${error.message}`);
        // Even if it fails, we'll still set musicEnabled to true
        // so the UI shows the correct state
      });

    musicEnabled = true;
  }

  console.log(`Background music is now ${musicEnabled ? 'enabled' : 'disabled'}`);
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

  console.log(`Attempting to play sound: ${soundName} from path: ${SOUNDS[soundName]}`);

  const audio = new Audio(SOUNDS[soundName]);
  audio.volume = VOLUME[soundName];

  isPlaying[soundName] = true;

  // Reset the flag when sound ends
  audio.onended = () => {
    console.log(`Sound ${soundName} ended successfully`);
    isPlaying[soundName] = false;
  };

  audio.play().then(() => {
    console.log(`Sound ${soundName} started playing successfully`);
  }).catch(error => {
    console.error(`Audio play failed for ${soundName}: ${error.message}`);
    isPlaying[soundName] = false;
  });
};
