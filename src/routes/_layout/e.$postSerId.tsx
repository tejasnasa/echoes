import { createFileRoute, Link } from "@tanstack/react-router";
import { usePost } from "../../api/fetchPost";
import { useQueryClient } from "@tanstack/react-query";
import { fetchUser } from "../../api/user";
import { formatDateTime } from "../../utils/datetime";
import pfp1 from "../../assets/pfp/1.jpg";
import pfp2 from "../../assets/pfp/2.avif";
import pfp3 from "../../assets/pfp/3.jpg";
import pfp4 from "../../assets/pfp/4.jpg";
import pfp5 from "../../assets/pfp/5.jpg";
import Like from "../../components/buttons/Like";
import Reply from "../../components/buttons/Reply";
import Repost from "../../components/buttons/Repost";
import Capture from "../../components/buttons/Capture";

export const Route = createFileRoute("/_layout/e/$postSerId")({
  component: RouteComponent,
});

const randomPic = () => {
  const pics = [pfp1, pfp2, pfp3, pfp4, pfp5];
  const randomIndex = Math.floor(Math.random() * pics.length);

  return pics[randomIndex];
};

function RouteComponent() {
  const { postSerId } = Route.useParams();
  const queryClient = useQueryClient();
  const { data, isLoading } = usePost(Number(postSerId));

  const prefetchUser = (userSerId: number) => {
    queryClient.prefetchQuery({
      queryKey: ["user", userSerId],
      queryFn: () => fetchUser(userSerId),
      staleTime: 5 * 60 * 1000,
    });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <main className="flex mt-4 mx-64 flex-col">
      <div className="flex justify-between">
        <Link
          to="/u/$userSerId"
          params={{ userSerId: String(data?.user.serialId) }}
          onMouseEnter={() => prefetchUser(data!.user.serialId)}
          className="flex items-center"
        >
          <img
            src={data?.user.profile_pic || randomPic()}
            alt=""
            className="h-16 rounded-full mr-4 hover:opacity-85 transition duration-300"
          />
          <div>
            <h3 className="font-semibold hover:underline transition duration-300">
              {data?.user.fullname}
            </h3>
            <h4 className="text-gray-300">@{data?.user.username}</h4>
          </div>
        </Link>
      </div>
      <div className="mt-4">
        {data?.text}
        <img
          src={data?.images?.[0]}
          alt=""
          className="mt-1 w-full rounded-xl overflow-hidden py-1"
        />
        <img
          src={data?.images?.[1]}
          alt=""
          className="mt-1 w-full rounded-xl overflow-hidden py-1"
        />
        <img
          src={data?.images?.[2]}
          alt=""
          className="mt-1 w-full rounded-xl overflow-hidden py-1"
        />
        <img
          src={data?.images?.[3]}
          alt=""
          className="mt-1 w-full rounded-xl overflow-hidden py-1"
        />
      </div>
      <div className="text-gray-300 mb-6">
        {data?.createdAt ? formatDateTime(new Date(data.createdAt)) : ""}
      </div>

      <div className="flex justify-around mb-8">
        <Like />
        <Reply />
        <Repost />
        <Capture />
      </div>
    </main>
  );
}
