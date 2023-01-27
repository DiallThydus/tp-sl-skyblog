import { Link } from "react-router-dom";
import formatDate from "../../utils/formatDate";
import usePosts from "../hooks/usePosts";

import "./posts.css";

export default function Posts() {
  const { data, isLoading } = usePosts();

  if (isLoading) {
    return (
      <div className="page-posts">
        <p>Chargement des posts</p>
      </div>
    );
  }

  return (
    <div className="page-posts">
      <h2>Posts</h2>
      <ul className="posts">
        {data?.posts ? (
          data?.posts?.map((post) => <PostSummary key={post.id} post={post} />)
        ) : (
          <p>no post</p>
        )}
      </ul>
    </div>
  );
}

function PostSummary({ post }: { post: Post }) {
  const { id, title, body, author, createdAt, updatedAt } = post;
  return (
    <li className="post-summary">
      <Link to={`/post/${id}`} className="reset">
        <h3 className="title">{title}</h3>
        <div className="body">{body}</div>
        <div className="author">
          By <div className="username">{author.username}</div> on
          <div className="date">{formatDate(createdAt)}</div>
          {updatedAt && (
            <>
              edited <div className="date">{formatDate(updatedAt)}</div>
            </>
          )}
        </div>
      </Link>
    </li>
  );
}
