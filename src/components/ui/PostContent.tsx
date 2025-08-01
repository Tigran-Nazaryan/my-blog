'use client';

import {Card, Typography, Button, Space} from 'antd';
import Link from 'next/link';
import {Post} from '@/types/post';

const {Title, Paragraph, Text} = Typography;

export default function PostContent({post}: { post: Post }) {
    return (
        <div style={{height:'100vh'}}>
            <Card style={{maxWidth: 800}}>
                <Space direction="vertical" size="middle">
                    <Title level={2}>{post.title}</Title>
                    <Text type="secondary">Author: {post.author}</Text>
                    <Text type="secondary">Date: {new Date(post.createdAt).toLocaleDateString()}</Text>

                    <Paragraph>{post.body}</Paragraph>

                    <Link href="/">
                        <Button type="primary">← Back to posts</Button>
                    </Link>
                </Space>
            </Card>
        </div>
    );
}
