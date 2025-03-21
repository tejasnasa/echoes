import { useAllPosts } from "../api/fetchPost";
import Echo from "./home/Echo";

const ReplyBlock = ({ postId }: { postId: string }) => {
  const { data } = useAllPosts();
  const posts = data?.filter((post) => post.postAboveId === postId);

  return (
    <section>
      <textarea
        name=""
        id=""
        className="w-full bg-transparent border-2 border-white rounded-xl p-3 my-2 mb-8 focus:outline-none h-32"
        placeholder="Echo back..."
      ></textarea>
      <div className="mt-4">{posts?.map((post) => <Echo post={post} />)}</div>
    </section>
  );
};

export default ReplyBlock;
