import React, { useState } from "react";
import FileSaver from "file-saver";

// function shuffleString(str: string): string {
//   if (!str) return "";
//   return str
//     .split("")
//     .sort(() => 0.5 - Math.random())
//     .join("");
// }

export default function Home() {
  const [text, setText] = useState<string>("");

  //   function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  //     e.preventDefault();
  //     if (!text) return;

  //     const lines = text.split(/\r?\n/);
  //     console.log(lines);

  //     let finalLines: string[];

  //     if (lines.length === 1) {
  //       const line = lines[0];
  //       const firstChar = line.slice(0, 1);
  //       const middlePart = line.slice(1, -1);
  //       const lastChar = line.slice(-1);

  //       const shuffledMiddle = shuffleString(middlePart);
  //       finalLines = [firstChar + shuffledMiddle + lastChar];
  //     } else {
  //       const firstLine = lines[0];
  //       const lastLine = lines[lines.length - 1];
  //       const middleLines = lines.slice(1, -1);

  //       const firstChar = firstLine.slice(0, 1);
  //       const restOfFirstLine = firstLine.slice(1);
  //       const shuffledFirstLine = firstChar + shuffleString(restOfFirstLine);

  //       const beginningOfLastLine = lastLine.slice(0, -1);
  //       const lastChar = lastLine.slice(-1);
  //       const shuffledLastLine = shuffleString(beginningOfLastLine) + lastChar;

  //       const shuffledMiddleLines = middleLines.map(shuffleString);

  //       finalLines = [
  //         shuffledFirstLine,
  //         ...shuffledMiddleLines,
  //         shuffledLastLine,
  //       ];
  //     }

  //     setText(finalLines.join("\n"));
  //   }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!text) return;

    const firstLetter = text.slice(0, 1);
    const middle = text.slice(1, -1);
    const lastLetter = text.slice(-1);

    const spacedMiddle = middle.split(/\r?\n/);
    const fixed = spacedMiddle.map((word) =>
      word
        .split("")
        .sort(() => 0.5 - Math.random())
        .join("")
    );
    setText(firstLetter + fixed.join("\n") + lastLetter);
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const txt = await file.text();
      setText(txt);
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
