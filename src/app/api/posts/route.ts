import { NextResponse } from 'next/server';

const API_BASE = process.env.API_BASE_URL;

export async function GET() {
    try {
        const res = await fetch(`${API_BASE}/posts`);

        if (!res.ok) {
            return NextResponse.json(
                { error: 'Failed to fetch posts' },
                { status: res.status }
            );
        }

        const posts = await res.json();
        return NextResponse.json(posts);

    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Unexpected error' },
            { status: 500 }
        );
    }
}
