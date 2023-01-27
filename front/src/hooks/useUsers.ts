import { useQuery } from "react-query";
import MakeRequest from "../utils/request";

export default function useUsers() {
  return useQuery<{ users: User[] }>("users", () =>
    MakeRequest({
      path: "admin/usersList",
    }).then((res) => res.json())
  );
}
