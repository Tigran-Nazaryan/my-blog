"use client";

import {useParams} from "next/navigation";
import React, {useEffect, useState} from "react";
import {Author} from "@/types/post";
import {getAuthorById} from "@/services/authorService";
import {Spin} from "antd";
import BlogListItem from "@/components/ui/blogListItem";
import {useAuth} from "@/store/store";

export default function AuthorPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const [author, setAuthor] = useState<Author | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();

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
          <BlogListItem key={post.id} post={post} currentUserId={user?.id} />
        ))
      }
    </div>
  );
}
