import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import FormComment from "./FormComment";
import PostComment from "./PostComment";

import usePost from "../../hooks/usePost";
import useUser from "../../hooks/useUser";
import formatDate from "../../utils/formatDate";
import getErrorMessage from "../../utils/getErrorMessage";
import MakeRequest from "../../utils/request";

import "./post.css";

export default function Post() {
  const navigate = useNavigate();
  const { data: user } = useUser();
  const { postId } = useParams<{ postId: string }>();
  const { data } = usePost(postId);

  const handleDeletePost = async () => {
    if (!window.confirm("Delete post?")) return;

    try {
      const request = await MakeRequest({
        path: `posts/${postId}`,
        method: "delete",
      });

      const data = await request.json();
      if (!request.ok) {
        const errorMessage = getErrorMessage(data?.error || data?.errors);
        throw new Error(errorMessage);
      }

      toast.success(data?.message || "Post deleted");
      navigate("/posts");
    } catch (error: any) {
      const errorMessage = getErrorMessage(error);

      console.error(errorMessage);
      toast.error(errorMessage);
    }
  };

  const post = data?.post;
  if (!post) {
    return (
      <div className="page-post">
        <p>No post data found</p>
      </div>
    );
  }

  const { title, body, author, comment, createdAt, updatedAt } = post;
  const createdDateFormated = formatDate(createdAt);
  const updatedDateFormated = formatDate(updatedAt);

  return (
    <div className="page-post">
      {(user!.role === "ADMIN" || author.email === user!.email) && (
        <p
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: ".25em",
          }}
        >
          <Link to={`/post/${postId}/edit`}>Edit</Link>
          <button
            className="reset link"
            type="button"
            onClick={handleDeletePost}
            style={{
              color: "red",
            }}
          >
            Delete
          </button>
        </p>
      )}
      <h2 className="post-title">{title}</h2>
      <p className="post-body">{body}</p>
      <div className="post-author">
        <div className="username">{author.username}, </div>
        {createdDateFormated === updatedDateFormated ? (
          <>
            Posted/edited <span className="date">{createdDateFormated}</span>
          </>
        ) : (
          <>
            Posted <span className="date">{createdDateFormated}</span>{" "}
            {updatedAt && (
              <>
                edited <span className="date">{updatedDateFormated}</span>
              </>
            )}
          </>
        )}
      </div>
      <h3 className="post-comments-title">Comments</h3>
      <ul className="post-comments">
        {comment?.length !== 0 ? (
          comment!.map((comment) => (
            <PostComment comment={comment} key={comment.id} />
          ))
        ) : (
          <p>No comment</p>
        )}
      </ul>
      <FormComment postId={postId!} />
    </div>
  );
}
