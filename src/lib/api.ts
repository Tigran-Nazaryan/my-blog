import {Post} from "@/types/post";

const API_BASE = process.env.API_BASE_URL;

export async function getPosts(): Promise<Post[]> {
    const res = await fetch(`${API_BASE}/posts`, {cache: 'no-store'});
    if (!res.ok) throw new Error(res.statusText);
    console.log(res)
    return await res.json();
}

export async function getPostById(id: string): Promise<Post> {
    const res = await fetch(`${API_BASE}/posts/${id}`, {cache: 'no-store'});
    if (!res.ok) throw new Error(res.statusText);
    return await res.json();
}
