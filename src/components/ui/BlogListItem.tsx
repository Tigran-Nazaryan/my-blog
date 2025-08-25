'use client';

import { Card, Typography, Button, Modal } from 'antd';
import Link from 'next/link';
import { Post } from "@/types/post";
import Image from "next/image";
import { useEffect, useState } from "react";
import { deletePost } from "@/services/postServices";
import { toast } from "react-toastify";
import EditPostModal from "@/components/ui/modals/EditPostModal";
import { followUser, unfollowUser } from "@/services/followsService";
import {useFollowContext} from "@/store/FollowContext";
import CommentSection from "@/components/ui/CommentSection";

const { Title, Paragraph, Text } = Typography;

export function BlogListItem({ post }: { post: Post }) {
  const [localPost, setLocalPost] = useState(post);
  const [deleted, setDeleted] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modal, contextHolder] = Modal.useModal();
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  const { followMap, updateFollowStatus } = useFollowContext();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setCurrentUserId(parsed.id);
      } catch (e) {
        console.error('Failed to parse user from localStorage', e);
      }
    }
  }, []);

  useEffect(() => {
    if (followMap[post.userId] !== undefined) {
      setLocalPost(prev => ({
        ...prev,
        user: {
          ...prev.user!,
          isFollowing: followMap[post.userId],
        },
      }));
    }
  }, [followMap, post.userId]);

  const isAuthor = currentUserId === post.userId;

  const handleFollow = async () => {
    setLoading(true);
    try {
      const isFollowing = localPost.user?.isFollowing;

      if (isFollowing) {
        await unfollowUser(localPost.userId);
        toast.success(`Unsubscribed from ${localPost.author}`);
      } else {
        await followUser(localPost.userId);
        toast.success(`Subscribed to ${localPost.author}`);
      }

      const newFollowState = !isFollowing;

      setLocalPost(prev => ({
        ...prev,
        user: {
          ...prev.user!,
          isFollowing: newFollowState,
        },
      }));

      updateFollowStatus(localPost.userId, newFollowState);
    } catch (error) {
      toast.error("Failed to update subscription");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (updatedPost: Post) => {
    setLocalPost(updatedPost);
    setEditModalOpen(false);
    toast.success("Post updated");
  };

  const showDeleteConfirm = () => {
    modal.confirm({
      title: 'Are you sure you want to delete this post?',
      content: 'This action cannot be undone.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        setLoading(true);
        return deletePost(localPost.id)
          .then(() => {
            setDeleted(true);
            toast.success("Post deleted");
          })
          .catch(() => {
            toast.error("Failed to delete post");
          })
          .finally(() => {
            setLoading(false);
          });
      },
    });
  };

  if (deleted) return null;

  return (
    <>
      {contextHolder}
      <Card style={{ marginBottom: '1rem' }} className="blog-card-container" hoverable>
        <Link href={`/blog/${localPost.id}`}>
          <Title level={4} style={{ marginBottom: 0 }}>
            {localPost.title}
          </Title>
        </Link>

        <Paragraph style={{ marginTop: '0.5rem' }}>
          {localPost.body.length > 100
            ? `${localPost.body.slice(0, 100)}...`
            : localPost.body}
        </Paragraph>

        <Text type="secondary">
          Author: <Link href={`/authors/${localPost.userId}`}>{localPost.author}</Link>
          {
            !isAuthor && (
              <Button
                size="small"
                onClick={handleFollow}
                loading={loading}
                style={{ marginLeft: 8 }}
              >
                {localPost.user?.isFollowing ? "Unsubscribe" : "Subscribe"}
              </Button>
            )
          }
        </Text>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
          <Image
            src={localPost.avatar as string}
            width={40}
            height={40}
            alt={`Avatar of ${localPost.author}`}
            style={{ borderRadius: '50%', marginBottom: 8 }}
            className="rounded-full"
          />

          {
            isAuthor && (
              <>
                <Button type="link" onClick={() => setEditModalOpen(true)}>Edit</Button>
                <Button type="link" danger onClick={showDeleteConfirm} loading={loading}>Delete</Button>
              </>
            )
          }
        </div>
        <CommentSection postId={Number(post.id)} userId={localPost.userId} />
      </Card>

      {editModalOpen && (
        <EditPostModal
          post={localPost}
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          onUpdate={handleUpdate}
        />
      )}
    </>
  );
}
