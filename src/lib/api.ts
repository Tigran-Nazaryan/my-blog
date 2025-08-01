import { Post } from "@/types/post";

const API_BASE = process.env.API_BASE_URL;

async function fetcher<T>(url: string, options?: RequestInit): Promise<T> {
    const res = await fetch(url, options);
    if (!res.ok) {
        // Можно обработать различные типы ошибок здесь
        const errorData = await res.json().catch(() => ({ message: res.statusText }));
        throw new Error(errorData.message || 'An error occurred while loading data.');
    }
    return await res.json();
}

export async function getPosts(): Promise<Post[]> {
    return fetcher<Post[]>(`${API_BASE}/posts`, { cache: 'no-store' });
}

export async function getPostById(id: string): Promise<Post> {
    return fetcher<Post>(`${API_BASE}/posts/${id}`, { cache: 'no-store' });
}