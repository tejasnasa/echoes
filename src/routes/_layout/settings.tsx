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
        <button className="text-red-500 m-8" onClick={handleLogout}>
          Logout
        </button>
      </section>
      {page === "editProfile" && (
        <section className="px-20 w-3/4">
          <h2 className="text-2xl m-8 ml-4 mt-20">Edit Profile</h2>
          <UpdateProfileForm />
        </section>
      )}
      {page === "changePassword" && (
        <section className="px-20 w-3/4">
          <h2 className="text-2xl m-8 ml-4 mt-20">Change Password</h2>
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
