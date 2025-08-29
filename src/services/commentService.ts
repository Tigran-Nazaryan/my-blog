import { apiRequest } from "@/lib/apiRequest";
import {Comment} from "@/types/post";

export async function getCommentsByPost(postId: number): Promise<Comment[]> {
  return await apiRequest(`/api/comments/posts/${postId}/comments`);
}

export async function createComment(postId: number, userId: number, content: string): Promise<Comment> {
  return await apiRequest("/api/comments", {
    method: "POST",
    body: JSON.stringify({ postId, userId, content }),
  });
}
