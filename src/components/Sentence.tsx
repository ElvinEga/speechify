type SentenceProps = {
  word: string;
  sentence: string;
  sentences: string[];
};

// Diplay the word being read in the sentence
export const Sentence = ({ word, sentence, sentences }: SentenceProps) => {
  return (
    <div className="sentence">
      <div className="flex p-4 items-center justify-between  rounded-xl bg-white text-slate-500 dark:bg-slate-600 dark:text-slate-200 mb-8">
        <p>{sentences.join(" ")} </p>
      </div>
      <div className="flex items-center justify-between p-4 rounded-xl bg-slate-200 text-slate-500 text-2xl dark:bg-slate-600 dark:text-slate-200">
        <p>
          {"`"}
          {sentence?.split(" ").map((wordItem, idx) => {
            const highlighted = wordItem === word;
            return (
              <span
                key={idx}
                style={{
                  color: highlighted ? "blue" : "black",
                  fontWeight: highlighted ? "bolder" : "normal",
                }}
              >
                {wordItem}{" "}
              </span>
            );
          })}
          {"`"}
        </p>
      </div>
      <br />
    </div>
  );
};
