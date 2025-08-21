export interface Post {
  id: string;
  title: string;
  avatar?: string
  body: string;
  author: string;
  userId: number;
  createdAt: string;
}

export interface Author {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  posts: Post[];
}