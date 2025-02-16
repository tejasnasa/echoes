import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Link to="/">Index </Link>
      <Link to="/home">home </Link>
      <Link to="/signup">signup </Link>
      <Link to="/login">login </Link>
      <Link to="/posts">posts </Link>
      <Outlet />
    </div>
  );
}
