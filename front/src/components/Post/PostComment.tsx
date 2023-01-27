import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

import useUser from "../../hooks/useUser";
import { queryClient } from "../../lib/queryCient";

import formatDate from "../../utils/formatDate";
import getErrorMessage from "../../utils/getErrorMessage";
import MakeRequest from "../../utils/request";
import FormField from "../Form/FormField";
import SubmitForm from "../Form/SubmitForm";

export default function PostComment({ comment }: { comment: Comment }) {
  const { data: user } = useUser();
  const [editMode, setEditMode] = useState<boolean>(false);

  const { id: commentId, description, author, createdAt, updatedAt } = comment;
  const createdDateFormated = formatDate(createdAt);
  const updatedDateFormated = formatDate(updatedAt);

  const handleDeleteComment = async () => {
    if (!window.confirm("Delete comment?")) return;

    try {
      const request = await MakeRequest({
        path: `comments/${commentId}`,
        method: "delete",
      });

      const data = await request.json();
      if (!request.ok) {
        const errorMessage = getErrorMessage(data?.error || data?.errors);
        throw new Error(errorMessage);
      }

      toast.success(data?.message || "Comment deleted");
      queryClient.invalidateQueries(["post", comment.postId]);
    } catch (error: any) {
      const errorMessage = getErrorMessage(error);

      console.error(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleEditMode = () => setEditMode(true);
  const handleResetFormEdit = (event: FormEvent<HTMLFormElement>) => {
    setEditMode(false);
    (event.target as HTMLFormElement).reset();
  };
  const handleEditSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formElement = event.target as HTMLFormElement;
    const form = new FormData(formElement);
    const description = (form.get("description") || "").toString();

    try {
      if (!description) {
        throw new Error("Missing comment description to edit");
      }

      const request = await MakeRequest({
        path: `comments/${commentId}`,
        method: "put",
        body: { description },
      });

      const data = await request.json();
      if (!request.ok) {
        const errorMessage = getErrorMessage(data?.error || data?.errors);
        throw new Error(errorMessage);
      }

      toast.success(data?.message || "Comment edited");
      queryClient.invalidateQueries(["posts", comment.postId]);
      handleResetFormEdit(event);
    } catch (error: any) {
      const errorMessage = getErrorMessage(error);

      toast.error(errorMessage);
      console.error(errorMessage);
    }
  };

  return (
    <li className="comment">
      <h4 className="comment-author">
        {author?.username} {user?.email === author?.email && "(you)"}
      </h4>
      {!editMode ? (
        <>
          <div className="comment-description">{description}</div>
          <div className="comment-details">
            {(author?.email === user?.email || user?.role === "ADMIN") && (
              <>
                <button
                  className="reset link"
                  type="button"
                  onClick={handleEditMode}
                >
                  Edit
                </button>
                <button
                  className="reset link"
                  type="button"
                  onClick={handleDeleteComment}
                  style={{
                    color: "red",
                  }}
                >
                  Delete
                </button>
              </>
            )}
            {createdDateFormated === updatedDateFormated ? (
              <>
                Commented/edited{" "}
                <span className="date">{createdDateFormated}</span>
              </>
            ) : (
              <>
                Commented <span className="date">{createdDateFormated}</span>{" "}
                {updatedAt && (
                  <>
                    edited <span className="date">{updatedDateFormated}</span>
                  </>
                )}
              </>
            )}
          </div>
        </>
      ) : (
        <form
          onSubmit={handleEditSubmit}
          onReset={handleResetFormEdit}
          style={{ marginBottom: "3em" }}
        >
          <FormField
            label="Edit comment"
            name="description"
            placeholder="Edit comment content"
            defaultValue={description}
            textarea
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1em",
            }}
          >
            <SubmitForm label="Edit comment" style={{ whiteSpace: "nowrap" }} />
            <SubmitForm label="Cancel" type="reset" />
          </div>
        </form>
      )}
    </li>
  );
}
