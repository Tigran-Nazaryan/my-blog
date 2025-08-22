"use client";

import {useEffect, useState} from "react";
import {getFollowsPosts} from "@/services/followsService";
import type {Post} from "@/types/post";
import {BlogListItem} from "@/components/ui/BlogListItem";

export default function FollowsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFollows = async () => {
      try {
        const follows = await getFollowsPosts();
        setPosts(follows);
      } catch (e) {
        console.error("Error fetching follows:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchFollows();
  }, []);

  return (
    <div>
      <h1>Posts from Authors You Follow</h1>

      {posts.map((post) => (
        <BlogListItem key={post.id} post={post} />
      ))}
    </div>
  );
}
