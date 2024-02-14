import { PlayingState, SpeechEngineState } from "../hooks/speech";

type ControlProps = {
  audioState: PlayingState;
  refetch: () => void;
  controls: {
    state: SpeechEngineState;
    play: () => void;
    pause: () => void;
    cancel: () => void;
    load: (text: string) => void;
  };
};

export const Controls = ({
  controls: { play, cancel, pause },
  refetch,
  audioState,
}: ControlProps) => {
  return (
    <div>
      <div className="flex items-center justify-between p-4 rounded-full bg-slate-200 text-slate-500 dark:bg-slate-600 dark:text-slate-200">
        <div className="flex items-center">
          {audioState === "playing" && (
            <button
              onClick={pause}
              type="button"
              className="bg-white text-gray-800 px-2 py-2 rounded-full "
            >
              <i className="bi bi-pause text-4xl text-slate-500 hover:text-blue-500 active:text-green-500"></i>
            </button>
          )}
          {audioState !== "playing" && (
            <button
              onClick={play}
              type="button"
              className="bg-white text-gray-800 px-2 py-2 rounded-full"
            >
              <i className="bi bi-play-fill text-4xl text-slate-500 hover:text-blue-500 active:text-green-500"></i>
            </button>
          )}
          <button
            onClick={cancel}
            type="button"
            className=" text-gray-800 px-2 py-2 rounded-full"
          >
            <i className="bi bi-stop-fill text-5xl hover:text-blue-500 active:text-green-500"></i>
          </button>
          <h2 className="text-xl font-semibold text-gray-500  dark:text-gray-300">
            {audioState}
          </h2>
        </div>
        <div className="flex items-center">
          <button
            onClick={() => {
              cancel();
              refetch();
            }}
            type="button"
            className="flex items-center bg-white text-gray-800 px-4 py-2 rounded-full  hover:text-blue-500 active:text-green-500"
          >
            <i className="bi bi-skip-end-fill text-3xl "></i>{" "}
            <h2 className="text-base font-semibold">Load More</h2>
          </button>
        </div>
      </div>
    </div>
  );
};
