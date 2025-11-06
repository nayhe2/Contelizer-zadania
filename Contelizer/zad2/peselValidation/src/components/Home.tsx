import { useState } from "react";
import { Button } from "@/components/ui/button";
import validator from "validator";

export default function Home() {
  const [pesel, setPesel] = useState("");

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
    result
      ? window.alert("pesel zgodny" + pesel)
      : window.alert("niepoprawny pesel " + pesel);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-4 p-4">
      <form
        action="submit"
        className="flex flex-col gap-5"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          value={pesel}
          onChange={handleChange}
          className="outline-2 outline-offset-2 outline-solid"
        ></input>
        <div className="flex flex-wrap items-center justify-center gap-2 md:flex-row">
          <Button
            className="hover:bg-amber-50 text-amber-900 border-amber-300"
            variant="outline"
          >
            Sprawdz pesel
          </Button>
        </div>
      </form>
    </div>
  );
}
