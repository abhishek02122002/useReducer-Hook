import "./styles.css";
import { useReducer } from "react";
const initalValue = {
  text: "",
  showLetters: true,
  showWords: true,
  showLines: true,
  showEachLetter: true,
};
//reducer function
function reducer(state, action) {
  switch (action.type) {
    case "set_text":
      return { ...state, text: action.payload };
    case "toggle_letters":
      return { ...state, showLetters: !state.showLetters };
    case "toggle_word":
      return { ...state, showWords: !state.showWords };
    case "toggle_line":
      return { ...state, showLines: !state.showLines };
    case "toogle_each_letter":
      return { ...state, showEachLetter: !state.showEachLetter };

    default:
      return state;
  }
}
// helper karnw wale funciton
function countLetters(word) {
  return word.replace(/[^a-zA-Z]/g, "").length;
}

function countWords(text) {
  return text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
}

function countLines(text) {
  return text === "" ? 0 : text.split("\n").length;
}

function countEachLetter(text) {
  const letters = text.toLowerCase().replace(/[^a-z]/g, "");
  const count = {};

  for (let char of letters) {
    count[char] = (count[char] || 0) + 1;
  }

  return Object.entries(count).sort(
    (a, b) => b[1] - a[1] || a[0].localeCompare(b[0])
  );
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initalValue);

  const { text, showEachLetter, showLetters, showLines, showWords } = state;

  const letterCount = countLetters(text);
  const wordCount = countWords(text);
  const lineCount = countLines(text);
  const eachLetterCount = countEachLetter(text);

  return (
    <div className="min-h-screen bg-green-500 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1
          className="text-3xl font-bold text-center mb-6 text-maroon-800"
          style={{ color: "#800000" }}
        >
          Text Analyzer
        </h1>

        <div className="mb-6">
          <label
            htmlFor="text-input"
            className="block text-lg font-medium mb-2"
            style={{ color: "#006400" }}
          >
            Enter your text:
          </label>
          <textarea
            id="text-input"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            rows={8}
            value={text}
            onChange={(evt) => {
              dispatch({ type: "set_text", payload: evt.target.value });
            }}
            placeholder="Type or paste your text here..."
          ></textarea>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <h2
            className="text-xl font-semibold mb-3"
            style={{ color: "#800000" }}
          >
            Display Options
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={showLetters}
                onChange={() => dispatch({ type: "toggle_letters" })}
                className="h-5 w-5 text-green-600 rounded"
              />
              <span style={{ color: "#006400" }}>Letter Count</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={showWords}
                onChange={(evt) => {
                  dispatch({ type: "toggle_word" });
                }}
                className="h-5 w-5 text-green-600 rounded"
              />
              <span style={{ color: "#006400" }}>Word Count</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={showLines}
                onChange={(evt) => {
                  dispatch({ type: "toggle_line" });
                }}
                className="h-5 w-5 text-green-600 rounded"
              />
              <span style={{ color: "#006400" }}>Line Count</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={showEachLetter}
                onChange={(evt) => {
                  dispatch({ type: "toogle_each_letter" });
                }}
                className="h-5 w-5 text-green-600 rounded"
              />
              <span style={{ color: "#006400" }}>Each Letter Count</span>
            </label>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: "#800000" }}
          >
            Analysis Results
          </h2>

          <div className="space-y-4">
            {showLetters && (
              <div className="p-3 bg-green-50 rounded-lg">
                <h3 className="font-medium" style={{ color: "#006400" }}>
                  Total Letters:
                </h3>
                <p className="text-2xl font-bold" style={{ color: "#800000" }}>
                  {letterCount}
                </p>
              </div>
            )}

            {showWords && (
              <div className="p-3 bg-green-50 rounded-lg">
                <h3 className="font-medium" style={{ color: "#006400" }}>
                  Total Words:
                </h3>
                <p className="text-2xl font-bold" style={{ color: "#800000" }}>
                  {wordCount}
                </p>
              </div>
            )}

            {showLines && (
              <div className="p-3 bg-green-50 rounded-lg">
                <h3 className="font-medium" style={{ color: "#006400" }}>
                  Total Lines:
                </h3>
                <p className="text-2xl font-bold" style={{ color: "#800000" }}>
                  {lineCount}
                </p>
              </div>
            )}

            {showEachLetter && eachLetterCount.length > 0 && (
              <div className="p-3 bg-green-50 rounded-lg">
                <h3 className="font-medium mb-2" style={{ color: "#006400" }}>
                  Letter Frequencies:
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {eachLetterCount.map(([letter, count]) => (
                    <div
                      key={letter}
                      className="flex items-center justify-between p-2 bg-white rounded shadow-sm"
                    >
                      <span
                        className="font-medium"
                        style={{ color: "#800000" }}
                      >
                        {letter.toUpperCase()}:
                      </span>
                      <span style={{ color: "#006400" }}>{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!showLetters && !showWords && !showLines && !showEachLetter && (
              <p className="text-center py-4" style={{ color: "#006400" }}>
                Select at least one option above to display statistics.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
