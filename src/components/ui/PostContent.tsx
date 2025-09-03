'use client';

import {Card, Typography, Button, Space} from 'antd';
import Link from 'next/link';
import {Post} from '@/types/post';
import Image from "next/image";
import {useRouter} from "next/navigation";

const {Title, Paragraph, Text} = Typography;

export default function PostContent({post}: { post: Post }) {
  const router = useRouter();
  return (
    <div>
      <Card style={{maxWidth: 800}}>
        <Space direction="vertical" size="middle">
          <Title level={2}>{post.title}</Title>
          <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
            <Link href={`/authors/${post.userId}`}>
              <Text type="secondary">{post.author}</Text>
            </Link>
            <Link href={`/authors/${post.userId}`}>
              {post.avatar && (
                <Image
                  src={post.avatar}
                  alt={`Avatar of ${post.author}`}
                  width={40}
                  height={40}
                  style={{borderRadius: '50%', marginBottom: 8}}
                  priority={false}
                />
              )}
            </Link>
          </div>
          <Paragraph>{post.body}</Paragraph>

          <Button type="primary" onClick={() => router.back()}>
            ← Back
          </Button>
        </Space>
      </Card>
    </div>
  );
}
