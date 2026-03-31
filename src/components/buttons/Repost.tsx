import { Waves } from "lucide-react";
import { useState } from "react";
import { queryClient } from "../../main";

const Repost = ({
  count = 0,
  byUser,
  postSerId,
}: {
  count?: number;
  byUser?: boolean;
  postSerId?: number;
}) => {
  const [active, setActive] = useState(byUser);
  const [value, setValue] = useState(count);

  const toggle = () => {
    setActive((prev) => !prev);
    setValue((prev) => (active ? prev - 1 : prev + 1));

    fetch(`${import.meta.env.VITE_BASE_URL}/repost/${postSerId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    queryClient.invalidateQueries({ queryKey: ["posts"] });
    queryClient.refetchQueries({ queryKey: ["posts"] });
  };

  return (
    <button
      className={`relative flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all duration-200 hover:bg-white/[0.04] hover:scale-105 active:scale-95 cursor-pointer ${
        active ? "text-echo-accent" : "text-gray-500 hover:text-gray-300"
      }`}
      onClick={toggle}
    >
      <Waves
        size={20}
        fill={active ? "#4CA5A6" : "transparent"}
        strokeWidth={2}
        className="transition-all duration-200"
      />
      <span className="text-xs font-medium">{value}</span>
    </button>
  );
};

export default Repost;
