'use client';

import {Card, Typography, Button, Modal} from 'antd';
import Link from 'next/link';
import {Post} from "@/types/post";
import Image from "next/image";
import {useState} from "react";
import {deletePost} from "@/services/postServices";
import {toast} from "react-toastify";
import EditPostModal from "@/components/ui/modals/EditPostModal";

const { Title, Paragraph, Text  } = Typography;

export function BlogListItem({post}: { post: Post }) {
  const [localPost, setLocalPost] = useState(post);
  const [deleted, setDeleted] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modal, contextHolder] = Modal.useModal();

  function handleUpdate(updatedPost: Post) {
    setLocalPost(updatedPost);
    setEditModalOpen(false);
    toast.success("Post updated");
  }

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
      <Card style={{marginBottom: '1rem'}} className="blog-card-container" hoverable>
        <Link href={`/blog/${localPost.id}`}>
          <Title level={4} style={{marginBottom: 0}}>
            {localPost.title}
          </Title>
        </Link>

        <Paragraph style={{marginTop: '0.5rem'}}>
          {localPost.body.length > 100
            ? `${localPost.body.slice(0, 100)}...`
            : localPost.body}
        </Paragraph>

        <Text type="secondary">
          Author: <Link href={`/authors/${localPost.userId}`}>{localPost.author}</Link>
        </Text>

        <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem'}}>

          <Image
            src={localPost.avatar as string}
            width={40}
            height={40}
            alt={`Avatar of ${localPost.author}`}
            style={{borderRadius: '50%', marginBottom: 8}}
            className="rounded-full"
          />

          <Button type="link" onClick={() => setEditModalOpen(true)}>Edit</Button>
          <Button type="link" danger onClick={showDeleteConfirm} loading={loading}>Delete</Button>
        </div>
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