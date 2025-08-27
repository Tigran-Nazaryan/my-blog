'use client';

import React from 'react';
import { Form, Input, Button, List, Typography } from 'antd';
import { createComment } from '@/services/commentService';
import { Comment } from '@/types/post';

const { TextArea } = Input;

export default function CommentSection({postId, userId, initialComments = []}: {
  postId: number;
  userId: number;
  initialComments?: Comment[];
}) {
  const [comments, setComments] = React.useState<Comment[]>(initialComments);
  const [loading, setLoading] = React.useState(false);
  const [form] = Form.useForm();

  const handleFinish = async (values: { content: string }) => {
    const { content } = values;

    if (!content.trim()) return;

    setLoading(true);
    try {
      const created = await createComment(postId, userId, content);
      setComments((prev) => [...prev, created]);
      form.resetFields();
    } catch (err) {
      console.error('Failed to add comment', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <Typography.Title level={4}>Comments</Typography.Title>

      <List
        rowKey={(comment) => comment.id}
        dataSource={comments}
        bordered
        renderItem={(comment) => (
          <List.Item key={comment.id}>
            <List.Item.Meta
              title={`${comment.user?.firstName ?? ''} ${comment.user?.lastName ?? ''}`}
              description={comment.content}
            />
          </List.Item>
        )}
      />

      <Form form={form} layout="vertical" onFinish={handleFinish} style={{ marginTop: 16 }}>
        <Form.Item
          name="content"
          rules={[{ required: true, message: 'Please write a comment' }]}
        >
          <TextArea rows={3} placeholder="Write your comment..." />
        </Form.Item>

        <Form.Item>
          <Button type="primary" onClick={() => form.submit()} loading={loading}>
            Post Comment
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
