import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { queryClient } from "../../lib/queryCient";
import getErrorMessage from "../../utils/getErrorMessage";

import FormField from "../Form/FormField";
import SubmitForm from "../Form/SubmitForm";

import "./auth.css";

export default function SignIn() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.target as HTMLFormElement);

    const email = (form.get("email") || "").toString();
    const password = (form.get("password") || "").toString();

    try {
      setLoading(true);

      if (!email || email === "") {
        throw new Error("Missing email");
      }

      if (!password || password === "") {
        throw new Error("Missing password");
      }

      const request = await fetch(
        `${process.env.REACT_APP_API_URL}/user/signin`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await request.json();
      if (!request.ok) {
        const errorMessage = getErrorMessage(data?.error || data?.errors);
        throw new Error(errorMessage);
      }

      queryClient.invalidateQueries("user");
      toast.success(data?.message || "Account created");
      navigate("/");
    } catch (error: any) {
      const errorMessage = getErrorMessage(error);

      console.error(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form className="form-auth" onSubmit={handleSubmitForm}>
      <h2>Sign In</h2>
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
      <SubmitForm loading={isLoading} />
      <p>
        Don't have an account? <Link to="/signup">Sign up now</Link>!
      </p>
    </form>
  );
}
