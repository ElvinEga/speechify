export type SpeechEngineOptions = {
  onBoundary: (e: SpeechSynthesisEvent) => void;
  onEnd: (e: SpeechSynthesisEvent) => void;
  onStateUpdate: (state: PlayingState) => void;
};

export type PlayingState = "initialized" | "playing" | "paused" | "ended";

export type SpeechEngineState = {
  utterance: SpeechSynthesisUtterance | null;
  config: {
    rate: number;
    volume: number;
    voice: SpeechSynthesisVoice;
  };
};

export type SpeechEngine = ReturnType<typeof createSpeechEngine>;

/**
 * Creates a speech engine that adapts the speech synthesis AP.
 * It allows for loading, playing, pausing, and canceling speech utterances, and provides callbacks for various states of the utterance.
 */
const createSpeechEngine = (options: SpeechEngineOptions) => {
  const state: SpeechEngineState = {
    utterance: null,
    config: {
      rate: 1,
      volume: 10,
      voice: window.speechSynthesis.getVoices()[0],
    },
  };

  // flag to track whether the utterance is paused
  let isPaused = false;

  window.speechSynthesis.onvoiceschanged = (e) => {
    state.config.voice = speechSynthesis.getVoices()[0];
  };

  const load = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = state.config.rate;
    utterance.volume = state.config.volume;
    utterance.voice = state.config.voice;
    utterance.onboundary = (e) => options.onBoundary(e);
    utterance.onend = (e) => {
      options.onStateUpdate("ended");
      options.onEnd(e);
    };
    state.utterance = utterance;
  };

  const play = () => {
    if (!state.utterance) throw new Error("No active utterance found to play");

    if (isPaused) {
      // If the utterance is paused, resume it
      options.onStateUpdate("playing");
      window.speechSynthesis.resume();
      isPaused = false;
    } else {
      // If the utterance is not paused, start a new utterance
      state.utterance.onstart = () => {
        console.log("waiting for onstart");
        options.onStateUpdate("playing");
      };
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(state.utterance);
    }
  };

  const pause = () => {
    options.onStateUpdate("paused");
    window.speechSynthesis.pause();
    isPaused = true;
  };
  const cancel = () => {
    options.onStateUpdate("initialized");
    window.speechSynthesis.cancel();
    isPaused = false;
  };

  return {
    state,
    play,
    pause,
    cancel,
    load,
  };
};

export { createSpeechEngine };
