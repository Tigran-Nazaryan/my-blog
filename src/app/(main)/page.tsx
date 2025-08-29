'use client';

import { useEffect, useState } from "react";
import BlogListItem from "@/components/ui/blogListItem";
import { getPosts } from "@/services/postServices";
import { Button, Input, Spin } from "antd";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    if (!isAuth) {
      router.push("/auth/login");
    } else if (user?.id) {
      setLoading(true);
      getPosts(user.id)
        .then(setPosts)
        .catch(() => toast.error("Failed to fetch posts"))
        .finally(() => setLoading(false));
    }
  }, [isAuth, isLoading, user?.id]);

  const handleSearch = () => {
    if (!user?.id) return;

    setIsFetching(true);
    getPosts(user.id, searchQuery.trim())
      .then(setPosts)
      .catch(() => toast.error("Failed to fetch posts"))
      .finally(() => setIsFetching(false));
  };

  const handleReset = () => {
    setSearchQuery('');
    if (!user?.id) return;

    setIsFetching(true);
    getPosts(user.id, '')
      .then(setPosts)
      .catch(() => toast.error("Failed to fetch posts"))
      .finally(() => setIsFetching(false));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handlePostCreated = (newPost: Post) => {
    setPosts(prev => [newPost, ...prev]);
  };

  const handleDeletePost = (postId: string) => {
    setPosts(prev => prev.filter(post => post.id !== postId));
  };

  if (loading) {
    return <Spin size="large" className="loading-spinner" />;
  }

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>
        <Input
          placeholder="Search posts by title, content or author"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{ maxWidth: 400 }}
          allowClear
        />
        <Button type="primary" onClick={handleSearch}>
          Search
        </Button>
        <Button type="default" onClick={handleReset}>
          Reset
        </Button>
      </div>

      {/* ➕ Кнопка создания поста */}
      <div style={{ marginBottom: '1rem' }}>
        <Button type="primary" onClick={() => setCreateModalOpen(true)}>
          Create new Post
        </Button>
      </div>

      {isFetching ? (
        <Spin size="large" />
      ) : (
        <div className="blog-items-container">
          {posts.length > 0 ? (
            posts.map((post) => (
              <BlogListItem
                key={post.id}
                post={post}
                currentUserId={user?.id ?? null}
                onDelete={() => handleDeletePost(post.id)}
              />
            ))
          ) : (
            <p>No posts found.</p>
          )}
        </div>
      )}

      <CreatePostModal
        open={createModalOpen}
        onCreated={handlePostCreated}
        onCancel={() => setCreateModalOpen(false)}
      />
    </div>
  );
}
