'use client';

import {useEffect, useState} from "react";
import BlogListItem from "@/components/ui/BlogListItem";
import {createPost} from "@/services/postServices";
import {Button, Spin} from "antd";
import {Post} from "@/types/post";
import {fetchPosts} from "@/lib/db";
import 'react-toastify/dist/ReactToastify.css';
import {toast} from "react-toastify";
import CreatePostModal from "@/components/ui/modals/CreatePostModal";
import {useAuth} from "@/store/store";
import {useRouter} from "next/navigation";

export default function Home() {
  const { checkAuth, isAuth, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    console.log('Auth status changed:', { isAuth, isLoading });
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
    if (isAuth) {
      async function getPosts() {
        setLoading(true);
        try {
          const fetchedPosts = await fetchPosts();
          setPosts(fetchedPosts);
        } catch (err) {
          toast.error("Failed to fetch posts");
        } finally {
          setLoading(false);
        }
      }
      getPosts();
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
        userId: 1
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
    return <Spin />;
  }

  return (
    <div style={{padding: '1rem'}}>
      <div style={{marginBottom: '1rem'}}>
        <Button type="primary" onClick={() => setCreateModalOpen(true)}>
          Create new Post
        </Button>
      </div>

      {posts.map((post) => (
        <BlogListItem key={post.id} post={post}/>
      ))}

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