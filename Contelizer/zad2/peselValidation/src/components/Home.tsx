import { useState } from "react";
import validator from "validator";

type statusType = "IS VALID" | "IS INVALID";

const Home = () => {
  const [pesel, setPesel] = useState("");
  const [status, setStatus] = useState<statusType | "">("");

  const calculateControlDigitAndCheck = (): boolean => {
    let sum = 0;
    const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
    for (let i = 0; i < 10; i++) {
      const digit = parseInt(pesel[i]);
      sum += digit * weights[i];
    }

    let controlDigit = (10 - (sum % 10)) % 10;
    return controlDigit === parseInt(pesel[10]);
  };

  const validateDate = () => {
    const year = parseInt(pesel[0] + pesel[1]);
    let month = parseInt(pesel[2] + pesel[3]);
    const day = pesel[4] + pesel[5];
    const century =
      month >= 80
        ? 1800
        : month >= 60
        ? 2200
        : month >= 40
        ? 2100
        : month >= 20
        ? 2000
        : 1900;
    month = month % 20;
    if (month < 1) return false;
    const monthStr = String(month).padStart(2, "0");
    const fullYear = century + year;
    const date = `${fullYear}-${monthStr}-${day}`;
    return validator.isDate(date) ? true : false;
  };

  const validatePesel = () => {
    if (pesel.length < 11) return false;
    if (!calculateControlDigitAndCheck() || !validateDate()) return false;
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 11);
    setPesel(value.slice(0, 11));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = validatePesel();
    result ? setStatus("IS VALID") : setStatus("IS INVALID");
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-4  w-full max-w-sm bg-white p-6 rounded-2xl shadow-md border border-gray-100"
      >
        <h1 className="text-xl font-semibold text-gray-800 text-center">
          PESEL Validator
        </h1>

        <div className="flex flex-col gap-2">
          <label htmlFor="pesel" className="text-gray-600 text-sm font-medium">
            PESEL
          </label>

          <input
            id="pesel"
            type="text"
            value={pesel}
            onChange={handleChange}
            placeholder="Enter 11 digits"
            className="px-3 py-2 mb-2 border border-gray-300 rounded-lg text-gray-800 
                   focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
          />

          <div className="h-6 flex justify-center items-center">
            {status && (
              <span
                className={`text-sm font-semibold ${
                  status === "IS VALID"
                    ? "text-green-600 bg-green-100 px-3 py-0.5 rounded-md"
                    : "text-red-600 bg-red-100 px-3 py-0.5 rounded-md"
                }`}
              >
                {status === "IS VALID" ? "PESEL is valid" : "PESEL is invalid"}
              </span>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition w-full"
        >
          Check PESEL
        </button>
      </form>
    </div>
  );
};

export default Home;
