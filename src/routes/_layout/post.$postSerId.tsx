import { createFileRoute, Link } from "@tanstack/react-router";
import { useAllPosts, usePost } from "../../api/fetchPost";
import { useQueryClient } from "@tanstack/react-query";
import { fetchUser } from "../../api/user";
import { formatDateTime } from "../../utils/datetime";
import { AudioLines, Bookmark, Heart, Waves } from "lucide-react";
import pfp1 from "../../assets/pfp/1.jpg";
import pfp2 from "../../assets/pfp/2.avif";
import pfp3 from "../../assets/pfp/3.jpg";
import pfp4 from "../../assets/pfp/4.jpg";
import pfp5 from "../../assets/pfp/5.jpg";
import Echo from "../../components/home/Echo";

export const Route = createFileRoute("/_layout/post/$postSerId")({
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
  const { data: replyData } = useAllPosts();

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
          to="/user/$userSerId"
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
      <div className="mt-4 mb-2 ">
        {data?.text}
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio,
        veniam quaerat cupiditate iure aliquid facilis, ad porro earum a
        consectetur obcaecati ullam? Ducimus modi dolores fugit, iure dolore
        expedita eum.
        <img
          src="https://pbs.twimg.com/media/GlwWSJHbIAAT69c?format=jpg&name=large"
          alt=""
          className="mt-3"
        />
      </div>
      <div className="text-gray-300 mb-6">
        {data?.createdAt ? formatDateTime(new Date(data.createdAt)) : ""}
      </div>

      <div className="flex justify-around mb-8">
        <button className="flex items-center relative group">
          <Heart
            size={30}
            fill="#4CA5A6"
            strokeWidth={0}
            className="transition-transform duration-200"
          />
          &nbsp; 51k
          <span className="absolute bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-cyan-500 text-sm bg-gray-600">
            &nbsp;resonate&nbsp;
          </span>
        </button>

        <button className="flex items-center relative group">
          <AudioLines size={28} className="transition-transform duration-200" />{" "}
          &nbsp; 522
          <span className="absolute bottom-8 left-1/4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-cyan-500 text-sm bg-gray-600">
            &nbsp;echo&nbsp;
          </span>
        </button>

        <button className="flex items-center relative group">
          <Waves size={28} className="transition-transform duration-200" />{" "}
          &nbsp; 4k
          <span className="absolute bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-cyan-500 text-sm bg-gray-600">
            &nbsp;reverberate&nbsp;
          </span>
        </button>

        <button className="flex items-center relative group">
          <Bookmark size={28} className="transition-transform duration-200" />{" "}
          &nbsp; 1k
          <span className="absolute bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-cyan-500 text-sm bg-gray-600">
            &nbsp;capture&nbsp;
          </span>
        </button>
      </div>

      <div className="space-y-4">
        {replyData?.map((post) => <Echo key={post.id} post={post} />)}
      </div>
    </main>
  );
}
