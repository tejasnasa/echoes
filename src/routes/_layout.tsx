import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
  useLocation,
} from "@tanstack/react-router";
import { isAuthenticated } from "../api/auth";
import logo from "../assets/logos/logo.png";
import {
  AudioLines,
  Bell,
  Bolt,
  Bookmark,
  Compass,
  House,
  Mail,
  Search,
} from "lucide-react";
import { useState } from "react";
import CreateModal from "../components/CreateModal";
import SearchModal from "../components/SearchModal";

export const Route = createFileRoute("/_layout")({
  component: RouteComponent,
  beforeLoad: async ({ location }) => {
    if ((await isAuthenticated()).success) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
});

function RouteComponent() {
  const location = useLocation();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleOpenSearchModal = () => {
    setIsSearchModalOpen(true);
  };

  const handleCloseSearchModal = () => {
    setIsSearchModalOpen(false);
  };

  return (
    <div className="bg-[#111628] text-white text-lg flex">
      <section className="w-[20%] h-dvh fixed pr-8 flex flex-col justify-between pl-10 border-r-[1px] border-gray-600">
        <div>
          <Link to="/">
            <img src={logo} alt="Echoes" className="h-16 m-4 mb-10 " />
          </Link>

          <Link
            to="/"
            className={`flex m-2 ml-4 p-2 items-center hover:bg-white/5 rounded-xl transition duration-200 ${location.pathname === "/" && "font-black text-xl"}`}
          >
            <House size={32} /> &ensp;&ensp; Home
          </Link>
          <button
            onClick={handleOpenSearchModal}
            className={`flex m-2 ml-4 p-2 items-center hover:bg-white/5 rounded-xl transition duration-200 w-[90%] ${isSearchModalOpen && "font-black text-xl"}`}
          >
            <Search size={32} /> &ensp;&ensp; Search
          </button>
          <Link
            to="/explore"
            className={`flex m-2 ml-4 p-2 items-center hover:bg-white/5 rounded-xl transition duration-200 ${location.pathname === "/explore" && "font-black text-xl"}`}
          >
            <Compass size={32} /> &ensp;&ensp; Explore
          </Link>
          <a className="flex m-2 ml-4 p-2 items-center hover:bg-white/5 rounded-xl transition duration-200">
            <Bell size={32} /> &ensp;&ensp; Pings
          </a>
          <a className="flex m-2 ml-4 p-2 items-center hover:bg-white/5 rounded-xl transition duration-200">
            <Mail size={32} /> &ensp;&ensp; Whispers
          </a>
          <Link
            to="/archive"
            className={`flex m-2 ml-4 p-2 items-center hover:bg-white/5 rounded-xl transition duration-200 ${location.pathname === "/archive" && "font-black text-xl"}`}
          >
            <Bookmark size={32} /> &ensp;&ensp; Archive
          </Link>
          <Link
            to="/settings"
            className={`flex m-2 ml-4 p-2 items-center hover:bg-white/5 rounded-xl transition duration-200 ${location.pathname === "/settings" && "font-black text-xl"}`}
          >
            <Bolt size={32} /> &ensp;&ensp; Settings
          </Link>
          <button
            className="flex m-2 ml-4 p-2 items-center hover:bg-white/90 rounded-lg transition duration-200 bg-gradient-to-r from-green-400 to-indigo-600 text-white font-semibold w-[80%]"
            onClick={handleOpenCreateModal}
          >
            <AudioLines size={32} /> &ensp;&ensp; Echo
          </button>

          <CreateModal
            isOpen={isCreateModalOpen}
            onClose={handleCloseCreateModal}
          />
          <SearchModal
            isOpen={isSearchModalOpen}
            onClose={handleCloseSearchModal}
          />
        </div>

        <div>
          <Link
            to="/u/$userSerId"
            params={{ userSerId: "1" }}
            className="flex items-center"
          >
            <img
              src={logo}
              alt="Echoes"
              className="h-12 m-6 mr-4 rounded-full border-white border-2"
            />
            <div className="text-sm">
              <div className="font-semibold">Tejas Nasa</div>
              <div className="text-gray-400">@tejasnasa</div>
            </div>
          </Link>
        </div>
      </section>

      <section className="w-[80%] ml-auto">
        <Outlet />
      </section>
    </div>
  );
}
