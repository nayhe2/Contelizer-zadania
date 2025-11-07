import { useState } from "react";
import Users from "./Users";
import Navbar from "./Navbar";
import { useDebounce } from "use-debounce";

const Home = () => {
  const [inputVal, setInputVal] = useState("");
  const [debouncedValue] = useDebounce(inputVal, 200);

  return (
    <div className="relative flex flex-col items-center min-h-screen">
      <div className="fixed top-0 left-0 w-full flex justify-center shadow z-50 bg-white py-2">
        <Navbar
          value={inputVal}
          changeInputValue={(val: string) => setInputVal(val)}
        />
      </div>

      <div className="pt-19">
        <Users value={debouncedValue} />
      </div>
    </div>
  );
};

export default Home;
