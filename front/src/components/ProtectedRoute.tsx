import { Navigate } from "react-router-dom";
import useUser from "../hooks/useUser";

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const { data: user, isLoading } = useUser();
  if (isLoading) {
    return (
      <div className="loader">
        <p>Loading</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" />;
  }

  return children;
}
