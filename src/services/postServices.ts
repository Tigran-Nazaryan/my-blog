import { Post } from "@/types/post";
import { apiRequest } from "@/lib/apiRequest";

export function createPost(postData: Omit<Post, "id" | "createdAt" | "userId">): Promise<Post> {
  return apiRequest("/api/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData),
  });
}

export function updatePost(id: string, updateData: Partial<Post>): Promise<Post> {
  return apiRequest(`/api/posts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updateData),
  });
}

export function deletePost(id: string): Promise<boolean> {
  return apiRequest(`/api/posts/${id}`, {
    method: "DELETE",
  }).then(() => true);
}

export const getPosts = async (userId: string): Promise<Post[]> => {
  return await apiRequest<Post[]>(`/api/posts/?userId=${userId}`);
};