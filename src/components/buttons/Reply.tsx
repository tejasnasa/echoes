import { Link } from "@tanstack/react-router";
import { AudioLines } from "lucide-react";

const Reply = ({ postSerId, count }: { postSerId?: number, count: number }) => {
  return (
    <Link
      params={{ postSerId: String(postSerId) }}
      to="/e/$postSerId"
      hash="reply"
      className={`flex items-center group px-4 py-2`}
    >
      <AudioLines
        size={24}
        strokeWidth={2}
        className="transition-transform duration-200"
      />{" "}
      &nbsp; {count}
      <span className="absolute bottom-8 left-1/4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-sm bg-gray-600">
        &nbsp;echo back&nbsp;
      </span>
    </Link>
  );
};

export default Reply;
