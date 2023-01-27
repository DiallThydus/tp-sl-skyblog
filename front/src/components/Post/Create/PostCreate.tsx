import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import getErrorMessage from "../../../utils/getErrorMessage";
import MakeRequest from "../../../utils/request";
import FormField from "../../Form/FormField";
import SubmitForm from "../../Form/SubmitForm";

export default function PostCreate() {
  const navigate = useNavigate();

  const handleCreatePost = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = new FormData(event.target as HTMLFormElement);
    const title = (form.get("title") || "").toString();
    const body = (form.get("body") || "").toString();

    try {
      if (!title) {
        throw new Error("Missing post title");
      }

      if (!body) {
        throw new Error("Missing post body");
      }

      const request = await MakeRequest({
        path: "posts/create",
        method: "post",
        body: {
          title,
          body,
        },
      });

      const data = await request.json();
      if (!request.ok) {
        const errorMessage = getErrorMessage(data?.error || data?.errors);
        throw new Error(errorMessage);
      }

      toast.success(data?.message || "Account created");
      navigate(`/post/${data?.post?.id}`);
    } catch (error: any) {
      const errorMessage = getErrorMessage(error);

      console.error(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="post-create">
      <h2>Create post</h2>
      <form onSubmit={handleCreatePost}>
        <FormField label="Title" name="title" placeholder="Post title" />
        <FormField label="Body" name="body" placeholder="Post body" textarea />
        <SubmitForm />
      </form>
    </div>
  );
}
