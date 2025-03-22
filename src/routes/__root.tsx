import { Outlet, createRootRoute, redirect } from "@tanstack/react-router";
import { isAuthenticated } from "../api/auth";

export const Route = createRootRoute({
  component: RootComponent,
  beforeLoad: async ({ location }) => {
    const auth = await isAuthenticated();
    if (
      auth.success === true &&
      (location.pathname === "/login" || location.pathname === "/signup")
    ) {
      throw redirect({ to: "/" });
    }
  },
});

function RootComponent() {
  return (
    <>
      <main className="delius-swash-caps-regular bg-[#111628] text-white">
        <Outlet />
      </main>
    </>
  );
}
