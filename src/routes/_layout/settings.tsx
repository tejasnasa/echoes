import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { logout } from "../../api/auth";
import { useState } from "react";
import UpdateProfileForm from "../../components/UpdateProfileForm";
import ChangePasswordForm from "../../components/ChangePasswordForm";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { newPasswordSchema } from "../../utils/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { changePassword } from "../../api/self";

export const Route = createFileRoute("/_layout/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const [page, setPage] = useState<"editProfile" | "changePassword">(
    "editProfile",
  );
  const [responseError, setResponseError] = useState<string | null>(null);

  const handleLogout = async () => {
    await logout();
    navigate({ to: "/login", replace: true });
  };

  const { mutate, isPending } = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      alert("Password updated!");
    },
    onError: (error) => {
      setResponseError(error.message);
    },
  });

  const form = useForm<z.infer<typeof newPasswordSchema>>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: { oldPassword: "", newPassword1: "", newPassword2: "" },
  });

  const onSubmit = (values: z.infer<typeof newPasswordSchema>) => {
    mutate(values);
  };

  return (
    <main className="min-h-dvh flex flex-col md:flex-row">


      <section className="w-full md:w-64 lg:w-72 border-b md:border-b-0 md:border-r border-white/[0.04] shrink-0">
        <h1 className="text-2xl font-bold m-6 mt-8 md:mt-10 bg-gradient-to-r from-green-400 to-indigo-500 bg-clip-text text-transparent">
          Settings
        </h1>
        <nav className="flex md:flex-col overflow-x-auto md:overflow-visible px-2 md:px-0">
          <button
            className={`relative px-5 py-3 text-sm font-medium text-left transition-all duration-200 rounded-lg md:rounded-none cursor-pointer whitespace-nowrap ${
              page === "editProfile"
                ? "settings-active text-white bg-white/[0.03]"
                : "text-gray-500 hover:text-white hover:bg-white/[0.02]"
            }`}
            onClick={() => setPage("editProfile")}
          >
            Edit Profile
          </button>
          <button
            className={`relative px-5 py-3 text-sm font-medium text-left transition-all duration-200 rounded-lg md:rounded-none cursor-pointer whitespace-nowrap ${
              page === "changePassword"
                ? "settings-active text-white bg-white/[0.03]"
                : "text-gray-500 hover:text-white hover:bg-white/[0.02]"
            }`}
            onClick={() => setPage("changePassword")}
          >
            Change Password
          </button>
          <button
            className="px-5 py-3 text-sm font-medium text-left text-red-400 hover:text-red-300 hover:bg-red-500/[0.05] transition-all duration-200 rounded-lg md:rounded-none cursor-pointer whitespace-nowrap"
            onClick={handleLogout}
          >
            Logout
          </button>
        </nav>
      </section>



      {page === "editProfile" && (
        <section className="flex-1 p-6 md:p-10 animate-fade-in-up">
          <h2 className="text-xl font-semibold mb-6">Edit Profile</h2>
          <UpdateProfileForm />
        </section>
      )}
      {page === "changePassword" && (
        <section className="flex-1 p-6 md:p-10 animate-fade-in-up">
          <h2 className="text-xl font-semibold mb-6">Change Password</h2>
          <ChangePasswordForm
            form={form}
            isPending={isPending}
            onSubmit={onSubmit}
            responseError={responseError}
            setResponseError={setResponseError}
          />
        </section>
      )}
    </main>
  );
}
