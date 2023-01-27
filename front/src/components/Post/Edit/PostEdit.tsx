import { FormEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import getErrorMessage from "../../../utils/getErrorMessage";
import MakeRequest from "../../../utils/request";
import FormField from "../../Form/FormField";
import SubmitForm from "../../Form/SubmitForm";
import usePost from "../../../hooks/usePost";

export default function PostEdit() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const { data, isLoading: isLoadingPost, isError } = usePost(postId);

  const [isLoading, setLoading] = useState<boolean>(false);

  const handleEditPost = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formElement = event.target as HTMLFormElement;
    const form = new FormData(formElement);

    const title = (form.get("title") || "").toString();
    const body = (form.get("body") || "").toString();

    try {
      setLoading(true);

      if (!title) {
        throw new Error("Missing post title");
      }

      if (!body) {
        throw new Error("Missing post body");
      }

      const request = await MakeRequest({
        path: `posts/${postId}`,
        body: { title, body },
        method: "PUT",
      });

      const data = await request.json();
      if (!request.ok) {
        const errorMessage = getErrorMessage(data?.error || data?.errors);
        throw new Error(errorMessage);
      }

      toast.success(data?.message || "Post updated");
      navigate(`/post/${data?.post?.id}`);
    } catch (error: any) {
      const errorMessage = getErrorMessage(error);

      console.error(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (isLoadingPost) {
    return <p>Loading post</p>;
  }

  if (isError) {
    return <p>Error post</p>;
  }

  const post = data?.post;
  if (!post) {
    return <p>Unable to find post</p>;
  }

  return (
    <div className="post-edit">
      <h2>Edit post</h2>
      <form onSubmit={handleEditPost}>
        <FormField
          label="Title"
          name={"title"}
          placeholder={"Post title"}
          defaultValue={post.title}
        />
        <FormField
          label="Body"
          name={"body"}
          placeholder={"Post body"}
          defaultValue={post.body}
          textarea
        />
        <SubmitForm loading={isLoading} />
      </form>
    </div>
  );
}
