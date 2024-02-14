import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Controls } from "./components/Controls";
import { Sentence } from "./components/Sentence";
import { getFromAPI, parseSentences } from "./api/speechify";
import { useSpeech } from "./hooks/useSpeech";

function App() {
  const [sentences, setSentences] = useState<Array<string>>([]);
  const [counter, setCounter] = useState(-1);
  const { currentWord, currentSentence, controls, audioState } =
    useSpeech(sentences);

  useEffect(() => {
    getFromAPI()
      .then((content) => {
        const parsedSentences = parseSentences(content);
        setSentences(parsedSentences);
      })
      .catch(console.error);
  }, [counter]);

  return (
    <div className="App">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-screen-md bg-slate-50 dark:bg-slate-800 p-8 rounded-xl">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-center text-3xl leading-9 font-extrabold text-gray-900 mb-4">
            Speechify Reader
          </h2>
          <p className="text-center text-sm sm:text-base md:text-xl text-gray-600 dark:text-gray-300">
            Press Play For a New Reading Experience
          </p>
        </div>
        <div className="mt-4">
          <div>
            <Sentence
              word={currentWord}
              sentence={currentSentence}
              sentences={sentences}
            />
          </div>
          <div>
            <Controls
              refetch={() => setCounter((c) => c + 1)}
              controls={controls}
              audioState={audioState}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
