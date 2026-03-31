import { Search } from "lucide-react";
import { useAllUsers } from "../api/user";
import { Link } from "@tanstack/react-router";
import randomPic from "../utils/temp/randomPic";
import { prefetchUser } from "../api/misc";

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal = ({ isOpen, onClose }: CreateModalProps) => {
  const { data } = useAllUsers();

  if (!isOpen) return null;

  return (
    <section className="fixed inset-0 z-[100]">
      <div className="fixed w-full h-full bg-black/40 backdrop-blur-sm" onClick={onClose}></div>

      <div
        className={`absolute bg-echo-bg/95 backdrop-blur-xl border-r border-white/[0.06] w-80 sm:w-96 h-screen left-0 bottom-0 transition-transform duration-300 ${
          isOpen ? "animate-slide-in" : "animate-slide-out"
        }`}
      >
        <h1 className="font-bold text-2xl m-6 mt-8 bg-gradient-to-r from-green-400 to-indigo-500 bg-clip-text text-transparent">
          Search
        </h1>

        <div className="flex items-center gap-3 mx-5 mb-6">
          <input
            type="text"
            placeholder="Search people..."
            className="flex-1 bg-white/[0.03] border border-white/[0.06] focus:border-green-400/40 focus:bg-white/[0.05] rounded-xl p-3 text-sm focus:outline-none transition-all duration-200 placeholder:text-gray-600"
          />
          <Search className="text-gray-500 shrink-0" size={20} />
        </div>

        <div className="mx-4">
          {data?.map((user) => (
            <Link
              key={user.serialId}
              to="/u/$userSerId"
              params={{ userSerId: String(user.serialId) }}
              onMouseEnter={() => prefetchUser(user.serialId)}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.04] transition-all duration-200 group"
              onClick={onClose}
            >
              <img
                src={user.profile_pic || randomPic()}
                alt=""
                className="h-10 w-10 rounded-full object-cover border border-white/10 group-hover:border-green-400/40 transition-all duration-200 shrink-0"
              />
              <div className="min-w-0">
                <span className="font-semibold text-sm group-hover:text-green-400 transition-colors duration-200">
                  {user.fullname}
                </span>
                <span className="text-gray-500 text-sm ml-2">@{user.username}</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="m-6 mt-4 text-sm text-green-400/80 hover:text-green-400 transition-colors cursor-pointer">
          Get more results...
        </div>
      </div>
    </section>
  );
};

export default SearchModal;
