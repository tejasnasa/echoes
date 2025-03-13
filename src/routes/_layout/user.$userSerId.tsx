import { createFileRoute } from "@tanstack/react-router";
import { useUser } from "../../api/user";
import coverimg from "../../assets/pfp/cover.jpg";
import pfp from "../../assets/logos/logo.png";

export const Route = createFileRoute("/_layout/user/$userSerId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { userSerId } = Route.useParams();
  const { data, isLoading } = useUser(Number(userSerId));

  if (isLoading) return <div>Loading...</div>;

  return (
    <main className="min-h-dvh">
      <img
        src={coverimg}
        alt=""
        className="h-[220px] w-4/5 object-cover absolute top-0 -z-0"
      />
      <section className="mt-20 z-1 mx-40 flex items-center justify-around">
        <div className="w-10"></div>
        <div className="flex flex-col w-min items-center">
          <img
            src={pfp}
            alt=""
            className="h-[220px] rounded-full z-10 relative border-[2px] border-white min-w-[220px]"
          />
          <h2 className="text-4xl mt-2">{data?.fullname}</h2>
          <h3 className="text-gray-300 text-xl mt-2">@{data?.username}</h3>
        </div>
        <button className="bg-white text-[#111628] text-2xl font-bold p-2 px-4 h-12 rounded-3xl mt-16">
          Follow
        </button>
      </section>
    </main>
  );
}
