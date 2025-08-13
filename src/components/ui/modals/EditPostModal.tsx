'use client';

import { Modal, Input, message } from 'antd';
import { useState, useEffect } from 'react';
import { updatePost } from '@/services/postServices';
import { Post } from '@/types/post';

interface EditPostModalProps {
  post: Post;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedPost: Post) => void;
}

export default function EditPostModal({ post, isOpen, onClose, onUpdate }: EditPostModalProps) {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);

  useEffect(() => {
    setTitle(post.title);
    setBody(post.body);
  }, [post]);

  async function handleUpdate() {
    setLoading(true);
    try {
      const updated = await updatePost(post.id, { title, body, userId: post.userId });
      onUpdate(updated);
      onClose();
      message.success("Post updated successfully!");
    } catch (err) {
      message.error("Failed to update post.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal
      title="Edit Post"
      open={isOpen}
      onOk={handleUpdate}
      onCancel={onClose}
      confirmLoading={loading}
    >
      <Input
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        style={{ marginBottom: 12 }}
      />
      <Input.TextArea
        placeholder="Body"
        value={body}
        onChange={e => setBody(e.target.value)}
        rows={4}
      />
    </Modal>
  );
}