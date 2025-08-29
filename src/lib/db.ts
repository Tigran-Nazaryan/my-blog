import { Post } from "@/types/post";

const API_BASE = process.env.NEXT_PUBLIC_BASE_URL;

export async function fetchPosts(): Promise<Post[]> {
    const res = await fetch(`${API_BASE}/api/posts`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to fetch posts");

    const json = await res.json();
    return json;
}

export async function getPostById(id: string): Promise<Post> {
    const res = await fetch(`${API_BASE}/api/posts/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
    });

    if (!res.ok) throw new Error("Post not found");

    const json = await res.json();
    return json.data;
}

