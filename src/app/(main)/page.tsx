'use client';

import {useEffect, useState} from "react";
import {BlogListItem} from "@/components/ui/blogListItem/BlogListItem";
import {createPost, getPostsWithComments} from "@/services/postServices";
import {Button, Spin} from "antd";
import {Post} from "@/types/post";
import 'react-toastify/dist/ReactToastify.css';
import {toast} from "react-toastify";
import CreatePostModal from "@/components/ui/modals/CreatePostModal";
import {useAuth} from "@/store/store";
import {useRouter} from "next/navigation";
import "./style/page.style.css";

export default function Home() {
  const {checkAuth, isAuth, isLoading, user} = useAuth();
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    if (!isLoading && !isAuth) {
      router.push("/auth/login");
    }
  }, [isAuth, isLoading]);

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostBody, setNewPostBody] = useState('');
  const [createLoading, setCreateLoading] = useState(false);

  useEffect(() => {
    if (isAuth && user?.id) {
      setLoading(true);
      getPostsWithComments(user.id)
        .then(setPosts)
        .catch(() => toast.error("Failed to fetch posts"))
        .finally(() => setLoading(false));
    }
  }, [isAuth]);

  async function handleCreatePost() {
    if (!newPostTitle || !newPostBody) {
      toast.error("The title and text cannot be empty.");
      return;
    }

    setCreateLoading(true);
    try {
      const newPost = await createPost({
        title: newPostTitle,
        body: newPostBody,
        author: "Admin",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
      });

      setPosts([newPost, ...posts]);
      setCreateModalOpen(false);
      setNewPostTitle('');
      setNewPostBody('');

      toast.success("Post successful created");
    } catch (err) {
      toast.error("Failed to create post");
    } finally {
      setCreateLoading(false);
    }
  }

  if (loading) {
    return <Spin/>;
  }

  return (
    <div style={{padding: '1rem'}}>
      <div style={{marginBottom: '1rem'}}>
        <Button type="primary" onClick={() => setCreateModalOpen(true)}>
          Create new Post
        </Button>
      </div>

      <div className="blog-items-container">
        {posts.map((post) => (
          <BlogListItem key={post.id} post={post} currentUserId={user?.id ?? null}/>
        ))}
      </div>

      <CreatePostModal
        open={createModalOpen}
        loading={createLoading}
        title={newPostTitle}
        body={newPostBody}
        onTitleChange={setNewPostTitle}
        onBodyChange={setNewPostBody}
        onOk={handleCreatePost}
        onCancel={() => setCreateModalOpen(false)}
      />
    </div>
  );
}
