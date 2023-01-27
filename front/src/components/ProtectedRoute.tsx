import { Navigate } from "react-router-dom";
import useUser from "../hooks/useUser";

export default function ProtectedRoute({
  children,
  admin = false,
}: {
  children: JSX.Element;
  admin?: boolean;
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

  if (admin && user.role !== "ADMIN") {
    return <Navigate to="/" />;
  }

  return children;
}
