import { Link } from "@tanstack/react-router";
import { AudioLines } from "lucide-react";

const Reply = ({ postSerId, count }: { postSerId?: number; count: number }) => {
  return (
    <Link
      params={{ postSerId: String(postSerId) }}
      to="/e/$postSerId"
      hash="reply"
      className="relative flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all duration-200 hover:bg-white/[0.04] hover:scale-105 active:scale-95 text-gray-500 hover:text-gray-300"
    >
      <AudioLines size={20} strokeWidth={2} className="transition-all duration-200" />
      <span className="text-xs font-medium">{count}</span>
    </Link>
  );
};

export default Reply;
