import { useQuery } from "react-query";
import MakeRequest from "../utils/request";

export default function usePosts() {
  return useQuery<{ posts: Post[] }>("posts", () =>
    MakeRequest({
      path: "posts",
    }).then((res) => res.json())
  );
}
