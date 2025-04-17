import { createFileRoute } from "@tanstack/react-router";
import { logout } from "../../api/auth";
import { useState } from "react";

export const Route = createFileRoute("/_layout/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  const [page, setPage] = useState<"editProfile" | "changePassword">(
    "editProfile"
  );

  return (
    <main className="min-h-dvh flex">
      <section className=" w-1/4 border-r-[1px] border-gray-700">
        <h1 className="text-3xl m-8 mt-16">Settings</h1>
        <button
          className={`p-6 py-2 my-2 w-full text-left ${page === "editProfile" ? "border-white border-r-4" : undefined}`}
          onClick={() => {
            setPage("editProfile");
          }}
        >
          Edit Profile
        </button>
        <button
          className={`p-6 py-2 my-2 w-full text-left ${page === "changePassword" ? "border-white border-r-4" : undefined}`}
          onClick={() => {
            setPage("changePassword");
          }}
        >
          Change Password
        </button>
        <button className="text-red-500 m-8" onClick={logout}>
          Logout
        </button>
      </section>
      {page === "editProfile" && (
        <section className="px-20 w-3/4">
          <h2 className="text-2xl m-8 ml-4 mt-20">Edit Profile</h2>
          <form className="flex flex-col m-4 w-2/3">
            <div className="flex flex-col">
              <label htmlFor="bio" className="my-1 mr-4">
                Bio
              </label>
              <textarea
                name="text"
                className="w-[600px] h-32 bg-inherit focus:outline-none min-h-32 max-h-32 border-[1px] border-gray-600 p-4"
                placeholder="Echo your feelings to the world..."
              ></textarea>
            </div>
            <div className="m-4">
              <label
                className={`cursor-pointer flex items-center gap-2
                } rounded-md max-w-fit`}
              >
                Update profile picture
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                />
              </label>
            </div>
            <div className="m-4">
              <label
                className={`cursor-pointer flex items-center gap-2
                } rounded-md max-w-fit`}
              >
                Update cover picture
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                />
              </label>
            </div>
            <button>Submit</button>
          </form>
        </section>
      )}
      {page === "changePassword" && (
        <section className="px-20 w-3/4">
          <h2 className="text-2xl m-8 ml-4 mt-20">Change Password</h2>
          <form className="flex flex-col m-4 w-2/3">
            <input type="text" />
            <input type="file" />
            <input type="file" />
            <button>Submit</button>
          </form>
        </section>
      )}
    </main>
  );
}
