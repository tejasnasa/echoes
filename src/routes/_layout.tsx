import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
  useLocation,
} from "@tanstack/react-router";
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
import { isAuthenticated } from "../api/auth";
import { useAuth } from "../api/self";
import { queryClient } from "../main";
import { usePreloadImage } from "../api/misc";
import logo2 from ".././assets/logos/logo2.jpg";

interface Authresult {
  success: boolean;
  message: string;
  responseObject: {
    fullname: string;
    profile_pic: string;
    serialId: number;
    username: string;
  };
  statusCode: number;
  accessToken: string | undefined;
}

export const Route = createFileRoute("/_layout")({
  component: RouteComponent,
  beforeLoad: async () => {
    const cachedAuth = queryClient.getQueryData<Authresult>(["auth"]);

    // Only trust cached authenticated state; revalidate stale unauthenticated state.
    if (cachedAuth?.success === true) {
      return;
    }

    const auth = await isAuthenticated();
    queryClient.setQueryData(["auth"], auth);

    if (auth.success === false) {
      throw redirect({
        to: "/login",
      });
    }
  },
});

function RouteComponent() {
  usePreloadImage(logo2);
  const location = useLocation();
  const { data, isLoading, isError } = useAuth();
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <div>Error loading authentication data</div>;
  }

  return (
    <div className="text-lg flex -z-20 min-h-screen w-full">
      <section className="w-[15%] sm:w-20 lg:w-[25%] xl:w-[20%] xl:min-w-[250px] h-dvh fixed flex flex-col justify-between border-r-[1px] border-gray-600 z-10 transition-all duration-300">
        <div className="w-full flex flex-col items-center lg:items-stretch lg:pl-6 xl:pl-10 lg:pr-4 xl:pr-8 mt-4">
          <Link
            to="/"
            className="w-full flex justify-center lg:justify-start mb-6 lg:mb-10"
          >
            <img
              src={logo}
              alt="Echoes"
              className="h-8 sm:h-10 lg:h-14 xl:h-16"
            />
          </Link>

          <Link
            to="/"
            className={`flex m-2 lg:ml-2 xl:ml-4 p-2 items-center justify-center lg:justify-start hover:bg-white/5 rounded-xl transition duration-200 ${location.pathname === "/" && "font-black text-xl"}`}
          >
            <House size={28} className="shrink-0 lg:mr-3" />{" "}
            <span className="hidden lg:inline">Home</span>
          </Link>
          <button
            onClick={handleOpenSearchModal}
            className={`flex m-2 lg:ml-2 xl:ml-4 p-2 items-center justify-center lg:justify-start hover:bg-white/5 rounded-xl transition duration-200 lg:w-[90%] ${isSearchModalOpen && "font-black text-xl"}`}
          >
            <Search size={28} className="shrink-0 lg:mr-3" />{" "}
            <span className="hidden lg:inline">Search</span>
          </button>
          <Link
            to="/explore"
            className={`flex m-2 lg:ml-2 xl:ml-4 p-2 items-center justify-center lg:justify-start hover:bg-white/5 rounded-xl transition duration-200 ${location.pathname === "/explore" && "font-black text-xl"}`}
          >
            <Compass size={28} className="shrink-0 lg:mr-3" />{" "}
            <span className="hidden lg:inline">Explore</span>
          </Link>
          <a className="flex m-2 lg:ml-2 xl:ml-4 p-2 items-center justify-center lg:justify-start hover:bg-white/5 rounded-xl transition duration-200 cursor-pointer">
            <Bell size={28} className="shrink-0 lg:mr-3" />{" "}
            <span className="hidden lg:inline">Pings</span>
          </a>
          <a className="flex m-2 lg:ml-2 xl:ml-4 p-2 items-center justify-center lg:justify-start hover:bg-white/5 rounded-xl transition duration-200 cursor-pointer">
            <Mail size={28} className="shrink-0 lg:mr-3" />{" "}
            <span className="hidden lg:inline">Whispers</span>
          </a>
          <Link
            to="/archive"
            className={`flex m-2 lg:ml-2 xl:ml-4 p-2 items-center justify-center lg:justify-start hover:bg-white/5 rounded-xl transition duration-200 ${location.pathname === "/archive" && "font-black text-xl"}`}
          >
            <Bookmark size={28} className="shrink-0 lg:mr-3" />{" "}
            <span className="hidden lg:inline">Archive</span>
          </Link>
          <Link
            to="/settings"
            className={`flex m-2 lg:ml-2 xl:ml-4 p-2 items-center justify-center lg:justify-start hover:bg-white/5 rounded-xl transition duration-200 ${location.pathname === "/settings" && "font-black text-xl"}`}
          >
            <Bolt size={28} className="shrink-0 lg:mr-3" />{" "}
            <span className="hidden lg:inline">Settings</span>
          </Link>

          <div className="w-full flex justify-center lg:justify-start lg:ml-2 xl:ml-4 mt-2 mb-4">
            <button
              className="flex items-center justify-center hover:bg-white/90 rounded-full lg:rounded-lg transition duration-200 bg-gradient-to-r from-green-400 to-indigo-600 text-white font-semibold w-12 h-12 lg:w-[80%] lg:h-auto lg:py-2 lg:px-4"
              onClick={handleOpenCreateModal}
            >
              <AudioLines size={28} className="shrink-0 lg:mr-3" />{" "}
              <span className="hidden lg:inline">Echo</span>
            </button>
          </div>

          <CreateModal
            isOpen={isCreateModalOpen}
            onClose={handleCloseCreateModal}
          />
          <SearchModal
            isOpen={isSearchModalOpen}
            onClose={handleCloseSearchModal}
          />
        </div>

        <div className="mb-4 lg:pl-6 w-full flex justify-center lg:justify-start">
          <Link
            to="/u/$userSerId"
            params={{ userSerId: data.responseObject.serialId }}
            className="flex items-center group"
          >
            <img
              src={logo}
              alt="Echoes"
              className="h-10 w-10 lg:h-12 lg:w-12 rounded-full border-white border-2 object-cover"
            />
            <div className="hidden lg:block text-sm ml-3">
              <div className="font-semibold group-hover:underline">
                @{data.responseObject.username}
              </div>
              <div className="text-gray-400 truncate max-w-[120px] xl:max-w-[150px]">
                {data.responseObject.fullname}
              </div>
            </div>
          </Link>
        </div>
      </section>

      <section className="ml-[15%] sm:ml-20 lg:ml-[25%] xl:ml-[20%] w-[85%] sm:w-[calc(100%-5rem)] lg:w-[75%] xl:w-[80%] pb-20 md:pb-0 flex-1 min-h-screen">
        <Outlet />
      </section>

      <CreateModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseCreateModal}
      />
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={handleCloseSearchModal}
      />
    </div>
  );
}
