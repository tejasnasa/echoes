import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import { isAuthenticated } from "../api/auth";
import { useContext } from "react";
import { ThemeContext } from "../store/theme-context";

export const Route = createFileRoute("/_layout")({
  component: RouteComponent,
  beforeLoad: async ({ location }) => {
    if ((await isAuthenticated()).success) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
});

function RouteComponent() {
  const themeCtx = useContext(ThemeContext);

  return (
    <div className={`${themeCtx}`}>
      <Link to="/">Index </Link>
      <Link to="/signup">signup </Link>
      <Link to="/login">login </Link>
      <Outlet />
    </div>
  );
}
