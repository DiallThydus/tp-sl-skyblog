import { useParams } from "react-router-dom";

import formatDate from "../../utils/formatDate";
import usePost from "../hooks/usePost";

import "./post.css";

export default function Post() {
  const { postId } = useParams<{ postId: string }>();
  const { data } = usePost(postId);

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
