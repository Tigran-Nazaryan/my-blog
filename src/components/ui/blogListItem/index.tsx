'use client';

import {Card, Typography, Button, Modal, Dropdown} from 'antd';
import {EllipsisOutlined, MessageOutlined} from '@ant-design/icons';
import Link from 'next/link';
import {Post} from "@/types/post";
import Image from "next/image";
import React, {useEffect, useState} from "react";
import {deletePost} from "@/services/postServices";
import {toast} from "react-toastify";
import EditPostModal from "@/components/ui/modals/EditPostModal";
import {followUser, unfollowUser} from "@/services/followsService";
import {useFollowContext} from "@/store/FollowContext";
import CommentSection from "@/components/ui/CommentSection";
import "./style/blogListItem.style.css";
import LikeButton from "@/components/ui/btn/LikeBtn";

const {Title, Paragraph, Text} = Typography;

const Index = ({post, currentUserId, onDelete, isFollowing}: {
  post: Post;
  currentUserId?: string | null;
  onDelete?: () => void,
  isFollowing?: boolean;
}) => {
  const [localPost, setLocalPost] = useState(post);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [modal, contextHolder] = Modal.useModal();
  const {followMap, updateFollowStatus} = useFollowContext();

  const isAuthor = String(currentUserId) === String(post.userId);

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
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          setLoading(true);
          await deletePost(localPost.id);
          toast.success("Post deleted");
          if (onDelete) onDelete();
        } catch (error) {
          toast.error("Failed to delete post");
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const dropdownItems = [
    {
      key: 'edit',
      label: 'Edit',
      onClick: () => setEditModalOpen(true),
    },
    {
      key: 'delete',
      label: 'Delete',
      danger: true,
      onClick: showDeleteConfirm,
    },
  ];

  return (
    <>
      {contextHolder}
      <Card
        style={{marginBottom: '1rem'}}
        className="blog-card-container"
        extra={
          isAuthor && (
            <Dropdown menu={{items: dropdownItems}} trigger={['click']}>
              <Button type="text" icon={<EllipsisOutlined/>}/>
            </Dropdown>
          )
        }
      >
        <Link href={`/blog/${localPost.id}`}>
          <Title level={4}>
            {localPost.title}
          </Title>
        </Link>

        <Paragraph style={{marginTop: '0.5rem'}}>
          {localPost.body.length > 100
            ? `${localPost.body.slice(0, 100)}...`
            : localPost.body}
        </Paragraph>

        <div className="author-info">
          <Link href={`/authors/${localPost.userId}`}>
            <Image
              src={localPost.avatar as string}
              width={40}
              height={40}
              alt={`Avatar of ${localPost.author}`}
              className="rounded-full"
              style={{borderRadius: "50%"}}
            />
          </Link>

          <Link href={`/authors/${localPost.userId}`}>
            <Text type="secondary">{localPost.author}</Text>
          </Link>

          {!isAuthor && (
            <Button
              size="small"
              onClick={handleFollow}
              loading={loading}
              style={{marginLeft: "auto"}}
            >
              {localPost.user?.isFollowing ? "Unsubscribe" : "Subscribe"}
            </Button>
          )}
        </div>

        <div className="comment-reaction">
          <Button
            type="text"
            icon={<MessageOutlined/>}
            onClick={() => setShowComments(prev => !prev)}
          >
            {localPost.comments?.length ?? 0} Comments
          </Button>
          <LikeButton postId={localPost.id} initialCount={localPost.likesCount || 0} initialIsLiked={localPost.isLiked || false}/>
        </div>

        {showComments && (
          <CommentSection
            postId={Number(post.id)}
            userId={localPost.userId}
            initialComments={localPost.comments || []}
          />
        )}
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
};

export default React.memo(Index);
