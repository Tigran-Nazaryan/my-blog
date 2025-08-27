'use client';

import { useEffect, useState } from "react";
import BlogListItem from "@/components/ui/blogListItem/BlogListItem";
import { getPostsWithComments } from "@/services/postServices";
import { Button, Spin } from "antd";
import { Post } from "@/types/post";
import { toast } from "react-toastify";
import CreatePostModal from "@/components/ui/modals/CreatePostModal";
import { useAuth } from "@/store/store";
import { useRouter } from "next/navigation";
import "./style/page.style.css";

export default function Home() {
  const { checkAuth, isAuth, isLoading, user } = useAuth();
  const router = useRouter();

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    if (!isAuth) {
      router.push("/auth/login");
    } else if (user?.id) {
      setLoading(true);
      getPostsWithComments(user.id)
        .then(setPosts)
        .catch(() => toast.error("Failed to fetch posts"))
        .finally(() => setLoading(false));
    }
  }, [isAuth, isLoading, user?.id]);

  const handlePostCreated = (newPost: Post) => {
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  const handleDeletePost = (postId: string) => {
    setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
  };

  if (loading) {
    return <Spin />;
  }

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ marginBottom: '1rem' }}>
        <Button type="primary" onClick={() => setCreateModalOpen(true)}>
          Create new Post
        </Button>
      </div>

      <div className="blog-items-container">
        {posts.map((post) => (
          <BlogListItem
            post={post}
            key={post.id}
            currentUserId={user?.id ?? null}
            onDelete={() => handleDeletePost(post.id)}
          />
        ))}
      </div>

      <CreatePostModal
        open={createModalOpen}
        onCreated={handlePostCreated}
        onCancel={() => setCreateModalOpen(false)}
      />
    </div>
  );
}
