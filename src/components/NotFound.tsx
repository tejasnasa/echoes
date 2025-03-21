import { Link } from "@tanstack/react-router";

const NotFound = () => {
  return (
    <main className="bg-[#111628] text-white min-h-dvh flex items-center flex-col">
      <div className="text-5xl font-bold mt-32 mb-10">Page Not Found!</div>
      <Link to="/" className="text-blue-400">
        Go to Home
      </Link>
    </main>
  );
};

export default NotFound;
