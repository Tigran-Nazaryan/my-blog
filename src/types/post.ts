export interface User {
  id: number;
  firstName: string;
  lastName: string;
  isFollowing?: boolean;
}

export interface Post {
  id: string;
  title: string;
  avatar?: string
  body: string;
  author: string;
  userId: number;
  createdAt: string;
  user?: User;
}

export interface Author {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  posts: Post[];
}