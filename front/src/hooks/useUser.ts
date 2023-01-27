import { useQuery } from "react-query";
import MakeRequest from "../utils/request";

export default function useUser() {
  return useQuery<User>(
    "user",
    () =>
      MakeRequest({
        path: "user",
      })
        .then((res) => res.json())
        .then((data) => data?.user),
    { retry: false }
  );
}
