"use client";
import { Card, Typography } from 'antd';
import Link from 'next/link';
import { Post } from "@/types/post";

const { Title, Paragraph, Text } = Typography;

export default function BlogListItem({ post }: { post: Post }) {
    return (
        <Link href={`/blog/${post.id}`}>
            <Card hoverable style={{ marginBottom: '1rem' }}>
                <Title level={4}>{post.title}</Title>
                <Paragraph>{post.body.slice(0, 100)}...</Paragraph>
                <Text type="secondary">
                    Автор: {post.author} · {new Date(post.createdAt).toLocaleDateString()}
                </Text>
            </Card>
        </Link>
    );
}