import { useParams } from "react-router-dom";

import formatDate from "../../utils/formatDate";

export default function Post() {
  const { postId } = useParams<{ postId: string }>();
  console.log(postId);
  // react query
  const comments: Comment[] = Array(5).fill({
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non aliquam quasi est totam perferendis fuga odio nam veniam fugiat omnis cumque quis, dignissimos, a soluta consectetur excepturi tempora hic saepe!",
    author: {
      username: "Sonny",
      email: "sonnyasdev@gmail.com",
      role: "USER",
    },
    createdAt: Date.now(),
    updatdAt: null,
  });
  return (
    <>
      <h2>mon post</h2>
      <p>détails</p>
      <ul className="comments">
        {comments.map((comment) => (
          <PostComment comment={comment} key={comment.id} />
        ))}
      </ul>
    </>
  );
}

function PostComment({ comment }: { comment: Comment }) {
  const { description, author, createdAt, updatedAt } = comment;
  return (
    <li>
      <div className="author">{author.username}</div>
      <div className="description">{description}</div>
      <div className="details">
        Commented {formatDate(createdAt)} {updatedAt && <>{updatedAt}</>}
      </div>
    </li>
  );
}
