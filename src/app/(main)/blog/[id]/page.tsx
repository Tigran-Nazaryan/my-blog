"use client";

import { useEffect, useState } from "react";
import { getPostById } from "@/lib/db";
import { Post } from "@/types/post";
import PostContent from "@/components/ui/PostContent";
import { useParams } from "next/navigation";
import {Spin} from "antd";

export default function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getPostById(id as string)
        .then((data) => {
          setPost(data);
          setLoading(false);
        })
        .catch((err) => {
          setError("Post not found");
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <Spin />;
  if (error || !post) return <div>{error || "Post not found"}</div>;

  return <PostContent post={post} />;
}
