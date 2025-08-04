import { Post } from "@/types/post";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

if (!API_BASE) {
    throw new Error("API_BASE_URL is not set");
}

export async function fetchPosts(): Promise<Post[]> {
    const res = await fetch(`${BASE_URL}/api/posts`);
    if (!res.ok) throw new Error('Failed to fetch posts');
    return res.json();
}

export async function getPostById(id: string):Promise<Post> {
    const res = await fetch(`${BASE_URL}/api/posts/${id}`, { cache: 'no-store' });
    if (!res.ok) {
        throw new Error('Post not found');
    }
    return res.json();
}
