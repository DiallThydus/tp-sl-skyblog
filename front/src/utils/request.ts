export default async function MakeRequest({
  path = "",
  method = "GET",
  body,
}: {
  path: string;
  method?: RequestInit["method"];
  body?: any;
}) {
  return fetch(`${process.env.REACT_APP_API_URL}/${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(body),
  });
}
