type LoginFormInputs = {
  emailOrUsername: string;
  password: string;
};

type SignupFormInputs = {
  email: string;
  password: string;
  username: string;
  fullname: string;
};

export const login = async (data: LoginFormInputs) => {
  const response = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify(data),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  return response;
};

export const signup = async (data: SignupFormInputs) => {
  const response = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/signup`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  return response;
};
