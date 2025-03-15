import { useQueryClient } from "@tanstack/react-query";
import {  Search } from "lucide-react";
import { fetchUser, useAllUsers } from "../api/user";
import { Link } from "@tanstack/react-router";
import pfp1 from ".././assets/pfp/1.jpg";
import pfp2 from ".././assets/pfp/2.avif";
import pfp3 from ".././assets/pfp/3.jpg";
import pfp4 from ".././assets/pfp/4.jpg";
import pfp5 from ".././assets/pfp/5.jpg";

const randomPic = () => {
  const pics = [pfp1, pfp2, pfp3, pfp4, pfp5];
  const randomIndex = Math.floor(Math.random() * pics.length);

  return pics[randomIndex];
};

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal = ({ isOpen, onClose }: CreateModalProps) => {
  const queryClient = useQueryClient();

  const { data } = useAllUsers();

  const prefetchUser = (userSerId: number) => {
    queryClient.prefetchQuery({
      queryKey: ["user", userSerId],
      queryFn: () => fetchUser(userSerId),
      staleTime: 5 * 60 * 1000,
    });
  };

  if (!isOpen) return null;

  return (
    <section className="fixed inset-0 z-100">
      <div className="fixed w-full h-full" onClick={onClose}></div>

      <div
        className={`absolute bg-[#111628] border-r-[1px] border-gray-600 w-96 h-screen left-0 bottom-0 transition-transform duration-300 ${
          isOpen ? "animate-slide-in" : "animate-slide-out"
        }`}
      >
        <h1 className="font-semibold text-4xl m-8">Search</h1>
        <div className="flex items-center mb-8">
          <input
            type="text"
            className="bg-transparent border-white border-[2px] focus:outline-none w-[80%] ml-4 rounded-2xl p-3"
          />
          <Search className="m-3" size={32} />
        </div>
        <div className="m-5">
          {data?.map((user) => (
            <div className="flex justify-between items-center my-3">
              <Link
                to="/u/$userSerId"
                params={{ userSerId: String(user.serialId) }}
                onMouseEnter={() => prefetchUser(user.serialId)}
                className="flex items-center"
              >
                <img
                  src={user.profile_pic || randomPic()}
                  alt=""
                  className="h-[54px] rounded-full mr-4 hover:opacity-85 transition duration-300"
                />
                <h3 className="font-semibold hover:underline transition duration-300 text-[1.1rem]">
                  {user.fullname}
                </h3>&nbsp; &nbsp;
                <h4 className="text-gray-300 text-[1rem]">@{user.username}</h4>
              </Link>
            </div>
          ))}
        </div>
        <div className="m-8 mt-4 text-[#4BB998]">Get more results...</div>
      </div>
    </section>
  );
};

export default SearchModal;
