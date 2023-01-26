import { Link } from "react-router-dom";
import formatDate from "../../utils/formatDate";

import "./posts.css";

export default function Posts() {
  const posts: Post[] = Array(5)
    .fill({
      id: null,
      title: "Mon article de test",
      body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur, at tempora ratione repellendus voluptates, maiores modi optio distinctio quos necessitatibus impedit magni dolore excepturi labore. Quaerat magnam nesciunt pariatur itaque. Consequuntur officia suscipit modi explicabo assumenda vel vitae, hic ipsa veniam ratione rerum et magni. Veritatis asperiores hic, corporis cupiditate magnam expedita voluptatibus, a consectetur aut accusamus optio magni repellat? Doloremque, nulla voluptas? Obcaecati maxime dolor tenetur numquam autem adipisci eos debitis repellat deserunt, deleniti eum similique rem? Ea quidem esse enim autem consequatur beatae magnam veniam fugit possimus inventore. Incidunt facilis atque rerum accusamus porro, dolorem libero, mollitia voluptatem rem ab aspernatur similique dolore facere, tenetur id ratione eum? Labore molestias ratione illo vel tempora? Quisquam dignissimos minima veniam! Temporibus, impedit rerum dolores maxime odit dolorum aut dolorem optio necessitatibus iusto porro facilis provident delectus enim dignissimos ab harum rem, voluptas cumque, esse dicta repellat dolore possimus. A, cum.",
      comment: [],
      author: {
        username: "Random User",
        email: "random.user@example.com",
        role: "USER",
      },
      createdAt: Date.now(),
      updatedAt: null,
    })
    .map((post) => ({ ...post, id: Math.random() * 10000 }));

  return (
    <div className="page-posts">
      <h2>Posts</h2>
      <ul className="posts">
        {posts.map((post) => (
          <PostSummary key={post.id} post={post} />
        ))}
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
