import { useQuery } from "react-query";

export default function usePosts() {
  return useQuery<{ posts: Post[] }>("posts", () =>
    fetch(`${process.env.REACT_APP_API_URL}/posts`, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((res) => res.json())
  );
}
