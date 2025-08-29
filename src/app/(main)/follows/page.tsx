"use client";

import {useEffect, useState} from "react";
import {fetchFollows} from "@/services/followsService";
import type {Post} from "@/types/post";
import BlogListItem from "@/components/ui/blogListItem";
import './style/follows.style.css'
import {Spin} from "antd";

export default function FollowsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFollows()
      .then(setPosts)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spin />;

  return (
    <div>
      <h1>Posts from Authors You Follow</h1>

      <div className="blog-items-container">
        {posts.map((post) => (
          <BlogListItem key={post.id} post={post}/>
        ))}
      </div>
    </div>
  );
}
