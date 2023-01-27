import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import useUser from "../../hooks/useUser";

import "./navbar.css";
import MakeRequest from "../../utils/request";
import getErrorMessage from "../../utils/getErrorMessage";
import { toast } from "react-toastify";
import { queryClient } from "../../lib/queryCient";

export default function Navbar() {
  const navigate = useNavigate();
  const { data: user } = useUser();

  const handleLogout = async () => {
    try {
      const request = await MakeRequest({
        path: "user/logout",
      });

      const data = await request.json();
      if (!request.ok) {
        const errorMessage = getErrorMessage(data?.error || data?.errors);
        throw new Error(errorMessage);
      }

      toast.success("Disconnected");
      queryClient.invalidateQueries("user");
      navigate("/");
    } catch (error: any) {
      const errorMessage = getErrorMessage(error);

      console.error(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <nav className="navbar">
      <ul className="nav-items">
        <li className="item">
          <Link to="/">Home</Link>
        </li>
        <li className="item">
          <Link to="/posts">Posts</Link>
        </li>
        {user ? (
          <>
            {user.role === "ADMIN" && (
              <li className="item">
                <Link to="/users">Users</Link>
              </li>
            )}
            <li className="item">
              <button className="reset link" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="item">
              <Link to="/signup">Sign Up</Link>
            </li>
            <li className="item">
              <Link to="/signin">Login</Link>
            </li>
          </>
        )}
      </ul>
      <Breadcrumb />
    </nav>
  );
}
