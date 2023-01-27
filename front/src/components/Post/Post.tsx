import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import usePost from "../../hooks/usePost";
import useUser from "../../hooks/useUser";
import formatDate from "../../utils/formatDate";
import getErrorMessage from "../../utils/getErrorMessage";
import MakeRequest from "../../utils/request";
import FormComment from "./FormComment";

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
  return (
    <div className="page-post">
      {author.email === user!.email && (
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
          {user!.role === "ADMIN" && (
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
          )}
        </p>
      )}
      <h2 className="post-title">{title}</h2>
      <p className="post-body">{body}</p>
      <div className="post-author">
        By <div className="username">{author.username}</div> on
        <div className="date">{formatDate(createdAt)}</div>
        {updatedAt && (
          <>
            edited <div className="date">{formatDate(updatedAt)}</div>
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

function PostComment({ comment }: { comment: Comment }) {
  const { description, author, createdAt, updatedAt } = comment;
  return (
    <li className="comment">
      <h4 className="comment-author">{author.username}</h4>
      <div className="comment-description">{description}</div>
      <div className="comment-details">
        Commented <span className="date">{formatDate(createdAt)}</span>{" "}
        {updatedAt && (
          <>
            edited <span className="date">{formatDate(updatedAt)}</span>
          </>
        )}
      </div>
    </li>
  );
}
