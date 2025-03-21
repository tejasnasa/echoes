import { Link } from "@tanstack/react-router";

const Error = ({ error }: { error: Error }) => {
  return (
    <main className="bg-[#111628] text-white min-h-dvh flex items-center flex-col">
      <div className="text-xl font-bold mt-32 mb-10">{error.message}</div>
      <div className="text-xl font-bold mt-32 mb-10">{error.name}</div>
      <div className="text-xl font-bold mt-32 mb-10">{error.stack}</div>
      <Link to="/" className="text-blue-400">
        Go to Home
      </Link>
    </main>
  );
};

export default Error;
