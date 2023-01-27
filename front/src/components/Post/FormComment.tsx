import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

import FormField from "../Form/FormField";
import SubmitForm from "../Form/SubmitForm";

import { queryClient } from "../../lib/queryCient";
import getErrorMessage from "../../utils/getErrorMessage";
import MakeRequest from "../../utils/request";

export default function FormComment({ postId }: { postId: string }) {
  const [isLoading, setLoading] = useState<boolean>(false);

  const handlePostComment = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formElement = event.target as HTMLFormElement;
    const form = new FormData(formElement);
    const description = (form.get("description") || "").toString();

    try {
      if (!description) {
        throw new Error("Missing post description");
      }

      const request = await MakeRequest({
        path: "comments/create",
        method: "post",
        body: {
          description,
          postId,
        },
      });

      const data = await request.json();
      if (!request.ok) {
        const errorMessage = getErrorMessage(data?.error || data?.errors);
        throw new Error(errorMessage);
      }

      queryClient.invalidateQueries(["posts", postId]);
      formElement.reset();
    } catch (error: any) {
      const errorMessage = getErrorMessage(error);

      console.error(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handlePostComment}
      style={{ width: "100%", maxWidth: "450px" }}
    >
      <FormField
        label="Add comment"
        name="description"
        placeholder="Add comment"
        textarea
      />
      <SubmitForm loading={isLoading} />
    </form>
  );
}
