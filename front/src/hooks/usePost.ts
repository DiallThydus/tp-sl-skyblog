import { useQuery } from "react-query";
import MakeRequest from "../utils/request";

export default function usePost(postId: string = "") {
  return useQuery<{ post: Post }>(["posts", postId], () =>
    MakeRequest({
      path: `posts/${postId}`,
    }).then((res) => res.json())
  );
}
