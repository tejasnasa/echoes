import { Heart } from "lucide-react";
import { useState } from "react";

const Like = () => {
  const [active, setActive] = useState(false);
  return (
    <button
      className={`flex items-center relative group ${active ? "text-[#4CA5A6]" : undefined} px-4 py-2`}
      onClick={() => {
        setActive((value) => !value);
      }}
    >
      <Heart
        size={30}
        fill={active ? "#4CA5A6" : "transparent"}
        strokeWidth={2}
        className="transition-transform duration-200"
      />
      &nbsp; 51k
      <span className="absolute bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200  text-sm bg-gray-600">
        &nbsp;resonate&nbsp;
      </span>
    </button>
  );
};

export default Like;
