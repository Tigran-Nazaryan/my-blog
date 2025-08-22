import { apiRequest } from "@/lib/apiRequest";
import type { Post } from "@/types/post";

export const getFollowsPosts = async (): Promise<Post[]> => {
  try {
    const result = await apiRequest<Post | Post[]>("/api/follows/getFollowsPosts");

    return Array.isArray(result) ? result : [result];
  } catch (error) {
    console.error("follows fetch error:", error);
    throw error;
  }
};

export const followUser = async (authorId: number): Promise<void> => {
  await apiRequest(`/api/follows/${authorId}`, { method: "POST" });
};

export const unfollowUser = async (authorId: number): Promise<void> => {
  await apiRequest(`/api/follows/${authorId}`, { method: "DELETE" });
};

export const checkIfFollowing = async (authorId: number): Promise<boolean> => {
  const res = await apiRequest<{ following: boolean }>(`/api/follows/check/${authorId}`);
  return res.following;
};
