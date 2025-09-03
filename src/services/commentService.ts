import { apiRequest } from "@/lib/apiRequest";
import {Comment} from "@/types/post";

type CreateCommentParams = {
  postId: number;
  content: string;
  parentId?: number;
};

export async function createComment({ postId, content, parentId }: CreateCommentParams): Promise<Comment> {
  const body = { postId, content, parentId: parentId ?? null };

  return await apiRequest("/api/comments", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function likeComment(commentId: number) {
  return await apiRequest(`/api/comments/${commentId}/like`, {
    method: "POST",
  });
}

export async function unlikeComment(commentId: number) {
  return await apiRequest(`/api/comments/${commentId}/like`, {
    method: "DELETE",
  });
}
