import {NextResponse} from 'next/server';

const API_BASE = process.env.API_BASE_URL;

export async function GET(
    _: Request,
    { params }: { params: { id: string } }
) {
    try {
        const res = await fetch(`${API_BASE}/posts/${params.id}`);
        if (!res.ok) {
            return NextResponse.json({error: 'Post not found'}, {status: 404});
        }
        const post = await res.json();
        return NextResponse.json(post);
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}
