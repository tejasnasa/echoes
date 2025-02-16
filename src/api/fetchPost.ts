import axios from "axios";

export const fetchPost = (id: string) => {
  return {
    hi: "hello",
    id,
  };
};

export const getPosts = async () => {
  const response = await axios.get("http://localhost:3000/api/v1/post", {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TEST_TOKEN}`,
    },
  });
  console.log(response.data, );
  return response.data.responseObject;
};
