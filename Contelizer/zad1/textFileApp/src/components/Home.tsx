import React, { useState } from "react";
import FileSaver from "file-saver";

export default function Home() {
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
    FileSaver.saveAs(blob, "nowy_tekst.txt");
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-4 p-4">
      <form
        className="flex flex-col items-center gap-4 w-full max-w-xl"
        onSubmit={handleSubmit}
      >
        {text && (
          <div className="w-full">
            <textarea
              className="resize-none border rounded-md border-gray-300 w-full h-64 sm:h-80 md:h-96 p-2 overflow-auto"
              value={text}
              readOnly={true}
            ></textarea>
          </div>
        )}

        <div className="border">
          <input
            id="file"
            type="file"
            className="w-full sm:w-auto"
            onChange={handleFileChange}
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-600 w-full sm:w-auto"
        >
          Shuffle
        </button>
      </form>

      <button
        onClick={handleSave}
        className="px-4 py-2 bg-green-400 text-white rounded hover:bg-green-600 w-full sm:w-auto"
      >
        Save
      </button>
    </div>
  );
}
