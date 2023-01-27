import { Navigate } from "react-router-dom";

interface RestrictedRouteProps {
  exists: any[];
  to: string;
  children: JSX.Element;
}
export default function RestrictedRoute({
  exists = [],
  to = "/",
  children,
}: RestrictedRouteProps): JSX.Element {
  const isExist = exists?.reduce((acc, ex) => {
    if (ex) {
      acc = true;
    }

    return acc;
  }, false);

  if (isExist) {
    return <Navigate to={to} />;
  }

  return children;
}
