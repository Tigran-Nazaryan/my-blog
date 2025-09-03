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

export async function getPosts(
  userId: string,
  search: string = '',
  page: number = 0,
): Promise<{ posts: Post[]; totalPages: number; currentPage: number; }> {
  const params = new URLSearchParams();
  if (search) params.append('search', search);
  params.append('page', page.toString());

  return apiRequest(`/api/posts?${params.toString()}`);
}
