'use client';

import {useEffect, useState} from "react";
import BlogListItem from "@/components/ui/blogListItem";
import SearchInput from "@/components/ui/SearchInput";
import {getPosts} from "@/services/postServices";
import {Button, Pagination, Spin} from "antd";
import {Post} from "@/types/post";
import {toast} from "react-toastify";
import CreatePostModal from "@/components/ui/modals/CreatePostModal";
import {useAuth} from "@/store/store";
import {useRouter} from "next/navigation";
import "./style/page.style.css";

export default function Home() {
  const {checkAuth, isAuth, isLoading, user} = useAuth();
  const router = useRouter();

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  const [currentSearch, setCurrentSearch] = useState("");

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isLoading || !user?.id) return;

    if (!isAuth) {
      router.push("/auth/login");
    } else {
      fetchPosts(currentSearch.trim(), page);
    }
  }, [isAuth, isLoading, user?.id, page]);

  const fetchPosts = (query: string, pageNumber: number) => {
    setLoading(true);
    getPosts(user!.id, query, pageNumber)
      .then((data) => {
        setPosts(data.posts);
        setTotalPages(data.totalPages);
      })
      .catch(() => toast.error("Failed to fetch posts"))
      .finally(() => setLoading(false));
  };

  const handleSearch = (query: string) => {
    if (!user?.id) return;

    setCurrentSearch(query);
    setPage(1);
    setIsFetching(true);

    getPosts(user.id, query.trim(), 1)
      .then((data) => {
        setPosts(data.posts);
        setTotalPages(data.totalPages);
      })
      .catch(() => toast.error("Failed to fetch posts"))
      .finally(() => setIsFetching(false));
  };

  const handleReset = () => {
    if (!user?.id) return;

    setCurrentSearch("");
    setPage(1);
    setIsFetching(true);

    getPosts(user.id, "", 1)
      .then((data) => {
        setPosts(data.posts);
        setTotalPages(data.totalPages);
      })
      .catch(() => toast.error("Failed to fetch posts"))
      .finally(() => setIsFetching(false));
  };

  const handlePostCreated = (newPost: Post) => {
    setPosts((prev) => [newPost, ...prev.slice(0, -1)]);
  };

  const handleDeletePost = (postId: string) => {
    setPosts((prev) => prev.filter((post) => post.id !== postId));
  };

  if (loading) {
    return <Spin size="large" className="loading-spinner"/>;
  }

  return (
    <div>
      <SearchInput onSearch={handleSearch} onReset={handleReset}/>

      <div style={{marginBottom: "1rem"}}>
        <Button type="primary" onClick={() => setCreateModalOpen(true)}>
          Create new Post
        </Button>
      </div>

      {isFetching ? (
        <Spin size="large"/>
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

      <div style={{display: "flex", justifyContent: "center", marginTop: 16}}>
        <Pagination
          current={page}
          pageSize={pageSize}
          total={totalPages * pageSize}
          onChange={(p) => setPage(p)}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
}
