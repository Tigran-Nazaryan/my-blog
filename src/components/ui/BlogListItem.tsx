'use client';

import {Card, Typography} from 'antd';
import Link from 'next/link';
import {Post} from "@/types/post";
import Image from "next/image";

const {Title, Paragraph, Text} = Typography;

export default function BlogListItem({post}: { post: Post }) {
  return (
    <Card style={{marginBottom: '1rem'}} className="blog-card-container" hoverable>
      <Link href={`/blog/${post.id}`}>
        <Title level={4} style={{marginBottom: 0}}>
          {post.title}
        </Title>
      </Link>

      <Paragraph style={{marginTop: '0.5rem'}}>
        {post.body.slice(0, 100)}...
      </Paragraph>

     <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
       <Text type="secondary">
         Author: {post.author} · {new Date(post.createdAt).toLocaleDateString()}
       </Text>

       <Image
         src={post.avatar}
         alt={`Avatar of ${post.author}`}
         width={40}
         height={40}
         style={{borderRadius: '50%', marginBottom: 8}}
         priority={false}
       />
     </div>
    </Card>
  );
}
