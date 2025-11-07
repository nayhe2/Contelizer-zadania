import  { useState } from "react";
import Users from "./Users";
import Navbar from "./Navbar";
import { useDebounce } from "use-debounce";

export default function Home() {
  const [inputVal, setInputVal] = useState("");
  const [debouncedValue] = useDebounce(inputVal, 500);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-4 p-4">
      <Navbar
        value={inputVal}
        changeInputValue={(val: string) => setInputVal(val)}
      />
      <Users value={debouncedValue} />
    </div>
  );
}
