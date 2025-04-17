import { Heart } from "lucide-react";
import { useState } from "react";
import { queryClient } from "../../main";

const Like = ({
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

  const toggle = async () => {
    setActive((prev) => !prev);
    setValue((prev) => (active ? prev - 1 : prev + 1));

    await fetch(`${import.meta.env.VITE_BASE_URL}/like/${postSerId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    queryClient.invalidateQueries({ queryKey: ["posts"] });
    queryClient.refetchQueries({ queryKey: ["posts"] });
  };

  return (
    <button
      className={`flex items-center group ${
        active ? "text-[#4CA5A6]" : undefined
      } px-4 py-2`}
      onClick={toggle}
    >
      <Heart
        size={24}
        fill={active ? "#4CA5A6" : "transparent"}
        className="transition-transform duration-200"
      />
      &nbsp; {value}
      <span className="absolute bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-sm bg-gray-600 p-1 rounded-md">
        resonate
      </span>
    </button>
  );
};

export default Like;
