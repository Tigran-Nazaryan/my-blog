'use client';

import { Card, Typography } from 'antd';
import Link from 'next/link';
import { Post } from "@/types/post";

const { Title, Paragraph, Text } = Typography;

export default function BlogListItem({ post }: { post: Post }) {
    return (
        <Card style={{ marginBottom: '1rem' }} hoverable>
            <Link href={`/blog/${post.id}`}>
                <Title level={4} style={{ marginBottom: 0 }}>
                    {post.title}
                </Title>
            </Link>

            <Paragraph style={{ marginTop: '0.5rem' }}>
                {post.body.slice(0, 100)}...
            </Paragraph>

            <Text type="secondary">
                Автор: {post.author} · {new Date(post.createdAt).toLocaleDateString()}
            </Text>
        </Card>
    );
}
