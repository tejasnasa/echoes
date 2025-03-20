import { Ellipsis } from "lucide-react";
import { useState } from "react";

const HomeOptions = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <button 
        onClick={() => {
          setShow((value) => !value);
        }}
        className="hover:bg-white/10 rounded-full m-2 ml-0 flex items-center justify-center transition"
      >
        <Ellipsis size={28} className="m-2" />
      </button>
      <div
        className={`bg-red-600 w-36 h-36 absolute left-0 ${show ? undefined : "hidden"}`}
      ></div>
    </div>
  );
};

export default HomeOptions;
