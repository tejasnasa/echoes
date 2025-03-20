import { Bookmark } from "lucide-react";
import { useState } from "react";

const Capture = ({
  count = 0,
  byUser,
}: {
  count?: number;
  byUser: boolean;
}) => {
  const [active, setActive] = useState(byUser);
  const [value, setValue] = useState(count);

  const toggle = () => {
    setActive((prev) => !prev);
    setValue((prev) => (active ? prev - 1 : prev + 1));
  };

  return (
    <button
      className={`flex items-center relative group ${active ? "text-[#4CA5A6]" : undefined} px-4 py-2`}
      onClick={toggle}
    >
      <Bookmark
        size={30}
        fill={active ? "#4CA5A6" : "transparent"}
        strokeWidth={2}
        className="transition-transform duration-200"
      />
      &nbsp; {value}
      <span className="absolute bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-cyan-500 text-sm bg-gray-600">
        &nbsp;capture&nbsp;
      </span>
    </button>
  );
};

export default Capture;
