import { useQuery } from "react-query";

export default function usePost(postId: string = "") {
  return useQuery<{ post: Post }>(["posts", postId], () =>
    fetch(`${process.env.REACT_APP_API_URL}/posts/${postId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((res) => res.json())
  );
}
