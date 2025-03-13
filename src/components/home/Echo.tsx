import { Link } from "@tanstack/react-router";
import { fetchPost, Post } from "../../api/fetchPost";
import { useQueryClient } from "@tanstack/react-query";
import { fetchUser } from "../../api/user";
import pfp1 from "../../assets/pfp/1.jpg";
import pfp2 from "../../assets/pfp/2.avif";
import pfp3 from "../../assets/pfp/3.jpg";
import pfp4 from "../../assets/pfp/4.jpg";
import pfp5 from "../../assets/pfp/5.jpg";
import timeAgo from "../../utils/datetime";
import { AudioLines, Bookmark, Heart, Waves } from "lucide-react";

const randomPic = () => {
  const pics = [pfp1, pfp2, pfp3, pfp4, pfp5];
  const randomIndex = Math.floor(Math.random() * pics.length);

  return pics[randomIndex];
};

const Echo = ({ post }: { post: Post }) => {
  const queryClient = useQueryClient();

  const prefetchPost = (postSerId: number) => {
    queryClient.prefetchQuery({
      queryKey: ["post", postSerId],
      queryFn: () => fetchPost(postSerId),
      staleTime: 5 * 60 * 1000,
    });
  };

  const prefetchUser = (userSerId: number) => {
    queryClient.prefetchQuery({
      queryKey: ["user", userSerId],
      queryFn: () => fetchUser(userSerId),
      staleTime: 5 * 60 * 1000,
    });
  };

  return (
    <Link
      params={{ postSerId: String(post.serialId) }}
      to="/post/$postSerId"
      onMouseEnter={() => prefetchPost(post.serialId)}
      className="m-16 text-lg"
      key={post.serialId}
    >
      <div className="flex justify-between">
        <Link
          to="/user/$userSerId"
          params={{ userSerId: String(post.user.serialId) }}
          onMouseEnter={() => prefetchUser(post.user.serialId)}
          className="flex items-center"
        >
          <img
            src={post.user.profile_pic || randomPic()}
            alt=""
            className="h-16 rounded-full mr-4 hover:opacity-85 transition duration-300"
          />
          <div>
            <h3 className="font-semibold hover:underline transition duration-300">
              {post.user.fullname}
            </h3>
            <h4 className="text-gray-300">@{post.user.username}</h4>
          </div>
        </Link>
        <div dangerouslySetInnerHTML={{ __html: timeAgo(post.createdAt) }} />
      </div>
      <div className="m-4">
        {post.text}
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
    </Link>
  );
};

export default Echo;
