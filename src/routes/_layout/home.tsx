import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { getPosts } from "../../api/fetchPost";

export const Route = createFileRoute("/_layout/home")({
  component: RouteComponent,
});

interface PostType {
  serialId: number;
  text: string;
  images: string[];
  created_at: Date;
  user: {
    fullname: string;
    username: string;
    id: string;
    profile_pic: string;
  };
}

function RouteComponent() {
  const { data, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      Hello "/_layout/posts"!
      <section>
        {data?.map((post: PostType) => (
          <div key={post.serialId}>
            <h1>{post.user.fullname}</h1>
            <p>{post.text}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
