import { toast } from "react-toastify";

import useUsers from "../../hooks/useUsers";

import { queryClient } from "../../lib/queryCient";
import formatDate from "../../utils/formatDate";
import getErrorMessage from "../../utils/getErrorMessage";
import MakeRequest from "../../utils/request";

import "./users.css";

export default function Users() {
  const { data } = useUsers();

  const users = data?.users;
  if (!users || users.length === 0) {
    return (
      <div className="page-users">
        <h2>Users</h2>
        <p>No users</p>
      </div>
    );
  }

  return (
    <div className="page-users">
      <h2>Users</h2>
      <table className="users">
        <thead>
          <tr>
            <td>Email</td>
            <td>Username</td>
            <td>Role</td>
            <td>Created At</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserItem user={user} key={user.email} />
          ))}
        </tbody>
      </table>
      <ul className="users"></ul>
    </div>
  );
}

function UserItem({ user }: { user: Omit<User, "token"> }) {
  const { id: userId, email, username, role, createdAt } = user;

  const handleDeleteUser = async () => {
    if (!window.confirm("Delete user?")) return;

    try {
      const request = await MakeRequest({
        path: `admin/${userId}`,
        method: "delete",
      });

      const data = await request.json();
      if (!request.ok) {
        const errorMessage = getErrorMessage(data?.error || data?.errors);
        throw new Error(errorMessage);
      }

      toast.success(data?.message || "User deleted");
      queryClient.invalidateQueries("users");
    } catch (error: any) {
      const errorMessage = getErrorMessage(error);

      toast.error(errorMessage);
      console.error(errorMessage);
    }
  };

  return (
    <tr>
      <td>{email}</td>
      <td>{username}</td>
      <td>{role}</td>
      <td>{formatDate(createdAt)}</td>
      <td>
        <button
          className="link reset"
          style={{ color: "red" }}
          onClick={handleDeleteUser}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
