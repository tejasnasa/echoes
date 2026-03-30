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
      <section className="w-full md:w-1/4 border-b-[1px] md:border-b-0 md:border-r-[1px] border-gray-700">
        <h1 className="text-2xl md:text-3xl m-4 md:m-8 mt-8 md:mt-16">Settings</h1>
        <div className="flex md:flex-col overflow-x-auto md:overflow-visible">
          <button
            className={`p-4 md:p-6 py-2 my-2 w-max md:w-full text-left ${page === "editProfile" ? "border-white border-b-4 md:border-b-0 md:border-r-4" : undefined}`}
            onClick={() => {
              setPage("editProfile");
            }}
          >
            Edit Profile
          </button>
        <button
            className={`p-4 md:p-6 py-2 my-2 w-max md:w-full text-left ${page === "changePassword" ? "border-white border-b-4 md:border-b-0 md:border-r-4" : undefined}`}
            onClick={() => {
              setPage("changePassword");
            }}
          >
            Change Password
          </button>
          <button className="text-red-500 m-4 md:m-8 w-max whitespace-nowrap" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </section>
      {page === "editProfile" && (
        <section className="p-4 md:px-20 w-full md:w-3/4">
          <h2 className="text-xl md:text-2xl mb-4 md:m-8 md:ml-4 md:mt-20">Edit Profile</h2>
          <UpdateProfileForm />
        </section>
      )}
      {page === "changePassword" && (
        <section className="p-4 md:px-20 w-full md:w-3/4">
          <h2 className="text-xl md:text-2xl mb-4 md:m-8 md:ml-4 md:mt-20">Change Password</h2>
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
