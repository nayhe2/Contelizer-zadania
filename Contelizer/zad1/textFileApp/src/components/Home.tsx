import React, { useState } from "react";
import FileSaver from "file-saver";

const Home = () => {
  const [text, setText] = useState<string>("");

  const shuffleLetters = (text: string): string => {
    const firstLetter = text.slice(0, 1);
    const middle = text.slice(1, -1);
    const lastLetter = text.slice(-1);

    const spacedMiddle = middle.split(/\r?\n/);
    const newMiddle = spacedMiddle.map((word) =>
      word
        .split("")
        .sort(() => 0.5 - Math.random())
        .join("")
    );
    const shuffledWord = firstLetter + newMiddle.join("\n") + lastLetter;
    return shuffledWord;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text || text.length < 3) return;

    const shuffledWord = shuffleLetters(text);
    setText(shuffledWord);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const txt = await file.text();
      if (txt.length < 3) setText(txt);
      const shuffledText = shuffleLetters(txt);
      setText(shuffledText);
    } catch (err) {
      console.error(err);
      setText("");
    }
  };

  const handleSave = () => {
    var blob = new Blob([text], {
      type: "text/plain;charset=utf-8",
    });
    FileSaver.saveAs(blob, "new_text.txt");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-6 flex flex-col gap-6 w-full max-w-xl border border-gray-200"
      >
        <h1 className="text-2xl font-semibold text-center text-gray-700">
          Shuffle and Save Text
        </h1>

        {text && (
          <textarea
            className="resize-none border border-gray-300 rounded-lg w-full h-64 sm:h-80 md:h-96 p-3 font-mono text-sm text-gray-800 focus:outline-none"
            value={text}
            readOnly
          ></textarea>
        )}

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <label
            htmlFor="file"
            className="cursor-pointer w-full sm:w-auto px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg border border-gray-300 transition"
          >
            Choose File
          </label>
          <input
            id="file"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />

          <div className="flex gap-3 w-full sm:w-auto">
            <button
              type="submit"
              className="flex-1 cursor-pointer sm:flex-none px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow transition"
            >
              Shuffle
            </button>
            <button
              onClick={handleSave}
              type="button"
              className="flex-1 cursor-pointer sm:flex-none px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow transition"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Home;
