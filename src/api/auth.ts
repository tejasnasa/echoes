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

  if (response.statusCode === 409) {
    throw new Error(response.message);
  }

  return response.responseObject;
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

export const isAuthenticated = async () => {
  const response = await fetch(`${import.meta.env.VITE_BASE_URL}/self/whoami`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then((res) => res.json());

  // const status = response.statusCode;

  // if (status !== 200 || status !== 401 || status !== 403) {
  //   throw new Error(JSON.stringify(response.responseObject));
  // }

  console.log(response);

  return response;
};
