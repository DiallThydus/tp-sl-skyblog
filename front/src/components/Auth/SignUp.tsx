import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import FormField from "../Form/FormField";
import SubmitForm from "../Form/SubmitForm";

import getErrorMessage from "../../utils/getErrorMessage";

import "./auth.css";

export default function SignUp() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.target as HTMLFormElement);

    const username = (form.get("username") || "").toString();
    const email = (form.get("email") || "").toString();
    const password = (form.get("password") || "").toString();
    const confirmPassword = (form.get("confirmPassword") || "").toString();

    try {
      setLoading(true);

      if (!username || username === "") {
        throw new Error("Missing username");
      } else if (username.length < 5) {
        throw new Error("Username too short");
      } else if (username.length > 64) {
        throw new Error("Username too long");
      }

      if (!email || email === "") {
        throw new Error("Missing emaim");
      }

      if (!password || password === "") {
        throw new Error("Missing password");
      } else if (password.length < 8) {
        throw new Error("Password too short");
      }

      if (password !== confirmPassword) {
        throw new Error("Passwords does not matchs");
      }

      const request = await fetch(
        `${process.env.REACT_APP_API_URL}/user/signup`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        }
      );

      const data = await request.json();
      if (!request.ok) {
        const errorMessage = getErrorMessage(data?.error || data?.errors);
        throw new Error(errorMessage);
      }

      toast.success(data?.message || "Account created");
      setTimeout(() => navigate("/signin"), 3000);
    } catch (error: any) {
      const errorMessage = getErrorMessage(error);
      console.log(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form-auth" onSubmit={handleSubmitForm}>
      <h2>Sign Up</h2>
      <FormField name="username" label="Username" placeholder="Username..." />
      <FormField
        name="email"
        type="email"
        label="Email"
        placeholder="Email..."
      />
      <FormField
        name="password"
        type="password"
        label="Password"
        placeholder="Password..."
      />
      <FormField
        name="confirmPassword"
        type="password"
        label="Confirm password"
        placeholder="Confirmation password..."
      />
      <SubmitForm loading={isLoading} />
      <p>
        Already have an account? <Link to="/signup">Sign in</Link>!
      </p>
    </form>
  );
}
