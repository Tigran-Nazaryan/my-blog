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
  comments?: Comment[];
  likesCount?: number;
  isLiked?: boolean;
}

export interface Author {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  posts: Post[];
  isFollowing?: boolean;
}

export type Comment = {
  id: number;
  postId: number;
  content: string;
  user: {
    id: number;
    firstName: string;
    lastName: string;
  };
  userId: number;
  likesCount: number;
  isLiked: boolean;
  parentId: number
};

export interface CommentWithReplies extends Comment {
  replies: CommentWithReplies[];
}