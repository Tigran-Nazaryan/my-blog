"use client";

import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import {Author} from "@/types/post";
import {getAuthorById} from "@/services/authorService";
import {Card, Spin} from "antd";
import Image from "next/image";

export default function AuthorPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const [author, setAuthor] = useState<Author | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) return;

    getAuthorById(id)
      .then(setAuthor)
      .catch((err) => setError(err));
  }, [id]);

  if (error) return <Spin />;
  if (!author) return <Spin />;

  return (
    <div>
      <h1>{author.firstName} {author.lastName}</h1>
      <h2>Posts</h2>
      {
        author.posts?.map(post => (
          <Card
            key={post.id}
            style={{marginBottom: '1rem'}}
            hoverable
          >
            <h3>{post.title}</h3>

            <p>
              {post.body.length > 100 ? `${post.body.slice(0, 100)}...` : post.body}
            </p>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginTop: '0.5rem',
              }}
            >
              <Image
                src={post.avatar ?? "/default-avatar.png"}
                width={40}
                height={40}
                alt={`Avatar of ${post.author}`}
                style={{borderRadius: '50%'}}
              />
            </div>
          </Card>
        ))
      }
    </div>
  );
}
