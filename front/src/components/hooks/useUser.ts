import { useQuery } from "react-query";

export default function useUser() {
  return useQuery("user", () =>
    fetch(`${process.env.REACT_APP_API_URL}/user`, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((res) => res.json())
  );
}
