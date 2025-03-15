import { createFileRoute } from "@tanstack/react-router";
import { useUser } from "../../api/user";
import coverimg from "../../assets/pfp/cover.jpg";
import pfp from "../../assets/logos/logo.png";
import { useState } from "react";
import { Ellipsis } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useAllPosts } from "../../api/fetchPost";
import Echo from "../../components/home/Echo";

export const Route = createFileRoute("/_layout/u/$userSerId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { userSerId } = Route.useParams();
  const { data, isLoading } = useUser(Number(userSerId));
  const { data: postData } = useAllPosts();
  const [isSynced, setIsSynced] = useState(false);
  const [hovered, setHovered] = useState(false);

  const sync = () => {
    setIsSynced((value) => !value);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <main className="min-h-dvh">
      <img
        src={coverimg}
        alt=""
        className="h-[220px] w-4/5 object-cover absolute top-0 -z-0"
      />
      <section className="mt-20 z-1 mx-36 flex items-center justify-between border-b-[1px] border-gray-600 pb-6">
        <div className="h-20 w-[30%] mt-4 text-justify">
          {data?.bio}
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus
          velit, possimus ut earum dolore, neque nulla eos, iusto ab obcaecati
          inventore itaque odio doloremque iste qui? Assumenda distinctio
          consectetur velit.
        </div>
        <div className="flex flex-col justify-center items-center">
          <img
            src={pfp}
            alt=""
            className="h-[220px] rounded-full z-10 relative border-[2px] border-white min-w-[220px]"
          />
          <h2 className="text-4xl mt-2">{data?.fullname}</h2>
          <h3 className="text-gray-300 text-xl mt-1">@{data?.username}</h3>
          <button
            className="bg-white text-[#111628] text-2xl font-bold p-2 px-4 h-12 rounded-3xl mt-4 transition duration-300"
            onClick={sync}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {hovered
              ? isSynced
                ? "Unsync"
                : "Sync"
              : isSynced
                ? "Synced"
                : "Sync"}
          </button>
        </div>
        <div className="h-20 w-[30%] flex justify-between">
          <div className="m-4 flex flex-col text-xl">
            <Link to="/" className=" hover:underline">
              <span className="font-semibold">Synced:</span>
              &nbsp;22579
            </Link>
            <Link to="/" className=" hover:underline mt-2">
              <span className="font-semibold">Echoes:</span>
              &nbsp;22579
            </Link>
          </div>
          <Ellipsis size={32} className="m-4" />
        </div>
      </section>
      <section className="mx-72 mt-4">
        {postData?.map((post) => <Echo post={post} />)}
      </section>
    </main>
  );
}
