import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <main className="delius-swash-caps-regular">
        <Outlet />
      </main>
    </>
  );
}
