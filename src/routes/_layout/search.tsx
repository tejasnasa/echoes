import { createFileRoute, Link } from "@tanstack/react-router";
import { Ellipsis, Search } from "lucide-react";
import Echo from "../../components/home/Echo";
import { useAllPosts } from "../../api/fetchPost";
import { useAllUsers } from "../../api/user";
import randomPic from "../../utils/temp/randomPic";
import { prefetchUser } from "../../utils/prefetch";

export const Route = createFileRoute("/_layout/search")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: postData, isLoading } = useAllPosts();

  const { data: userData } = useAllUsers();

  if (isLoading)
    return (
      <main className="mx-72 mt-4 h-dvh">
        <div className="loader">
          <div className="inner-circle"></div>
        </div>
      </main>
    );

  return (
    <main className="min-h-dvh mx-72 mt-4">
      <section className="flex items-center mb-8">
        <input
          type="text"
          className="bg-transparent border-white border-[2px] focus:outline-none w-full rounded-2xl p-3"
        />
        <Search className="m-3" size={32} />
      </section>

      <section className="border-gray-600 border-b-[1px]">
        {userData?.map((user) => (
          <div className="flex justify-between items-center my-4">
            <Link
              to="/u/$userSerId"
              params={{ userSerId: String(user.serialId) }}
              onMouseEnter={() => prefetchUser(user.serialId)}
              className="flex items-center"
            >
              <img
                src={user.profile_pic || randomPic()}
                alt=""
                className="h-16 rounded-full mr-4 hover:opacity-85 transition duration-300"
              />
              <h3 className="font-semibold hover:underline transition duration-300">
                {user.fullname}&nbsp; &nbsp;
              </h3>
              <h4 className="text-gray-300">@{user.username}</h4>
            </Link>
            <div className="flex items-center text-gray-300">
              <Ellipsis />
            </div>
          </div>
        ))}
      </section>

      <section>{postData?.map((post) => <Echo post={post} />)}</section>
    </main>
  );
}
