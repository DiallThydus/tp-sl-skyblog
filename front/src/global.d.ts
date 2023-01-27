interface User {
  username: string;
  email: string;
  role: string;
  token: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Post {
  id: string;
  title: string;
  body: string;
  comment?: Comment[];
  author: Author;
  createdAt: Date;
  updatedAt: Date;
}

interface Comment {
  id: string;
  description: string;
  postId: string;
  post?: Post;
  authorId: string;
  author?: Author;
  createdAt: Date;
  updatedAt: Date;
}

interface Author {
  username: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}
