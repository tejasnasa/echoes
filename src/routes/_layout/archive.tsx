import { createFileRoute } from "@tanstack/react-router";
import { useAllPosts } from "../../api/fetchPost";
import Echo from "../../components/home/Echo";
import { useState } from "react";

export const Route = createFileRoute("/_layout/archive")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading } = useAllPosts();
  const [tab, setTab] = useState<"captures" | "resonates">("captures");

  const viewCaptures = () => {
    setTab("captures");
  };

  const viewresonates = () => {
    setTab("resonates");
  };

  if (isLoading)
    return (
      <main className="mx-72 mt-4 h-dvh">
        <div className="loader">
          <div className="inner-circle"></div>
        </div>
      </main>
    );

  return (
    <main className="mx-72 mt-4 flex flex-col">
      <div className="flex justify-around text-2xl">
        <button
          onClick={viewCaptures}
          className={`w-5/12 pb-2 ${tab === "captures" ? "border-b-4 " : "border-b-[1px]"}`}
        >
          Captures
        </button>
        <button
          onClick={viewresonates}
          className={`w-5/12 pb-2 ${tab === "resonates"  ? "border-b-4 " : "border-b-[1px]"}`}
        >
          Resonates
        </button>
      </div>
      <section>
        {tab === "captures" && data?.map((post) => <Echo post={post} />)}
        {tab === "resonates" && <div className="h-dvh">hello</div>}
      </section>
    </main>
  );
}
