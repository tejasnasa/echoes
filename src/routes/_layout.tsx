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
import randomPic from "../utils/temp/randomPic";

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

  const handleOpenCreateModal = () => setIsCreateModalOpen(true);
  const handleCloseCreateModal = () => setIsCreateModalOpen(false);
  const handleOpenSearchModal = () => setIsSearchModalOpen(true);
  const handleCloseSearchModal = () => setIsSearchModalOpen(false);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-dvh">
        <div className="loader-ring w-9 h-9 rounded-full"></div>
      </div>
    );
  }

  if (isError || !data) {
    return <div>Error loading authentication data</div>;
  }

  const navItems = [
    { to: "/" as const, icon: House, label: "Home" },
    { to: "/explore" as const, icon: Compass, label: "Explore" },
    { to: "/archive" as const, icon: Bookmark, label: "Archive" },
    { to: "/settings" as const, icon: Bolt, label: "Settings" },
  ];

  return (

    <div className="text-lg flex min-h-screen w-full relative">

      <div className="ambient-orbs">
        <div className="ambient-orb-3"></div>
      </div>

      <aside className="sidebar-island w-16 sm:w-20 lg:w-64 fixed flex flex-col justify-between z-10 backdrop-blur-xl">
        <div className="flex flex-col items-center lg:items-stretch lg:px-4 mt-6">

          <Link to="/" className="flex justify-center lg:justify-start lg:px-3 mb-8 group">
            <img
              src={logo}
              alt="Echoes"
              className="h-8 sm:h-9 lg:h-12 transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          <nav className="flex flex-col gap-0.5">
            {navItems.map((item) => {
              const isActive = location.pathname === item.to;
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  className={`relative flex items-center justify-center lg:justify-start gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 hover:bg-white/[0.04] ${
                    isActive ? "nav-active-bar bg-white/[0.03] font-bold" : "text-gray-400 hover:text-white"
                  }`}
                >
                  <Icon size={20} className="shrink-0" />
                  <span className="hidden lg:inline text-sm">{item.label}</span>
                </Link>
              );
            })}

            <button
              onClick={handleOpenSearchModal}
              className={`relative flex items-center justify-center lg:justify-start gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 hover:bg-white/[0.04] cursor-pointer ${
                isSearchModalOpen ? "nav-active-bar bg-white/[0.03] font-bold" : "text-gray-400 hover:text-white"
              }`}
            >
              <Search size={20} className="shrink-0" />
              <span className="hidden lg:inline text-sm">Search</span>
            </button>

            <a className="flex items-center justify-center lg:justify-start gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 hover:bg-white/[0.04] text-gray-400 hover:text-white cursor-pointer">
              <Bell size={20} className="shrink-0" />
              <span className="hidden lg:inline text-sm">Pings</span>
            </a>
            <a className="flex items-center justify-center lg:justify-start gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 hover:bg-white/[0.04] text-gray-400 hover:text-white cursor-pointer">
              <Mail size={20} className="shrink-0" />
              <span className="hidden lg:inline text-sm">Whispers</span>
            </a>
          </nav>

          <div className="mt-5 flex justify-center lg:justify-stretch">
            <button
              className="pulse-ring btn-glow bg-gradient-to-r from-green-400 to-indigo-600 flex items-center justify-center gap-2.5 rounded-full lg:rounded-2xl text-white font-semibold w-11 h-11 lg:w-full lg:h-auto lg:py-2 cursor-pointer shadow-lg shadow-green-500/10 hover:shadow-green-500/25 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] transition-all duration-200"
              onClick={handleOpenCreateModal}
            >
              <AudioLines size={20} className="shrink-0" />
              <span className="hidden lg:inline text-sm">Echo</span>
            </button>
          </div>
        </div>

        <div className="mb-4 flex justify-center lg:justify-stretch lg:px-3">
          <Link
            to="/u/$userSerId"
            params={{ userSerId: data.responseObject.serialId }}
            className="flex items-center gap-3 p-2 rounded-xl transition-all duration-200 hover:bg-white/[0.04] group w-full justify-center lg:justify-start"
          >
            <img
              src={data.responseObject.profile_pic || randomPic()}
              alt="You"
              className="h-9 w-9 rounded-full border border-white/10 object-cover transition-all duration-300 group-hover:border-green-400/40"
            />
            <div className="hidden lg:block text-sm min-w-0">
              <div className="font-semibold truncate text-xs group-hover:text-green-400 transition-colors duration-200">
                @{data.responseObject.username}
              </div>
              <div className="text-gray-500 text-xs truncate">
                {data.responseObject.fullname}
              </div>
            </div>
          </Link>
        </div>
      </aside>

      <main className="ml-[calc(4rem+12px)] sm:ml-[calc(5rem+12px)] lg:ml-[calc(16rem+12px)] flex-1 min-h-screen pb-20 md:pb-0 relative z-[1]">
        <Outlet />
      </main>


      <CreateModal isOpen={isCreateModalOpen} onClose={handleCloseCreateModal} />
      <SearchModal isOpen={isSearchModalOpen} onClose={handleCloseSearchModal} />
    </div>
  );
}
