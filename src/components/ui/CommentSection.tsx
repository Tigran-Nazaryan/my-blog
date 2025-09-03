'use client';

import React, {Dispatch, SetStateAction} from 'react';
import {
  Form,
  Input,
  Button,
  List,
  Typography,
} from 'antd';
import { createComment } from '@/services/commentService';
import {Comment, Post} from '@/types/post';
import CommentItem from "@/components/CommentItem";

const { TextArea } = Input;

type CommentWithReplies = Comment & { replies: CommentWithReplies[] };

export default function CommentSection({postId, userId, initialComments = [], setLocalPostAction}: {
  postId: number;
  userId: number;
  initialComments?: Comment[];
  setLocalPostAction: Dispatch<SetStateAction<Post>>;
}) {
  const [comments, setComments] = React.useState<Comment[]>(initialComments);
  const [loading, setLoading] = React.useState(false);
  const [form] = Form.useForm();
  const [replyToId, setReplyToId] = React.useState<number | null>(null);
  const [activeKeys, setActiveKeys] = React.useState<string[]>([]);

  const buildCommentsTree = (flatComments: Comment[]): CommentWithReplies[] => {
    const map = new Map<number, CommentWithReplies>();
    const roots: CommentWithReplies[] = [];

    flatComments.forEach((comment) => {
      map.set(comment.id, { ...comment, replies: [] });
    });

    map.forEach((comment) => {
      if (comment.parentId) {
        const parent = map.get(comment.parentId);
        if (parent) {
          parent.replies.push(comment);
        } else {
          roots.push(comment);
        }
      } else {
        roots.push(comment);
      }
    });

    return roots;
  };

  const commentsTree = buildCommentsTree(comments);

  const handleFinish = async (values: { content: string }) => {
    const { content } = values;
    if (!content.trim()) return;

    setLoading(true);
    try {
      const dataToSend = {
        postId,
        content,
        ...(replyToId !== null ? { parentId: replyToId } : {}),
      };

      const created = await createComment(dataToSend);

      setComments((prev) => [...prev, created]);

      setLocalPostAction(prev => ({
        ...prev,
        comments: [...(prev.comments || []), created],
      }));

      form.resetFields();
      setReplyToId(null);
      setActiveKeys((prev) =>
        replyToId !== null
          ? [...prev, created.parentId?.toString() || created.id.toString()]
          : prev
      );
    } catch (err) {
      console.error('Failed to add comment', err);
    } finally {
      setLoading(false);
    }
  };


  const replyingToComment = comments.find((c) => c.id === replyToId);

  const renderReplies = (comment: CommentWithReplies) => (
    <CommentItem
      key={comment.id}
      comment={comment}
      activeKeys={activeKeys}
      setActiveKeys={setActiveKeys}
      setReplyToId={setReplyToId}
      renderReplies={renderReplies}
      isReply={true}
    />
  );

  return (
    <div style={{ marginTop: '2rem' }}>
      <Typography.Title level={4}>Comments</Typography.Title>

      <List
        style={{ width: '100%' }}
        rowKey="id"
        dataSource={commentsTree}
        bordered={false}
        renderItem={(comment) => (
          <List.Item key={comment.id} style={{ border: 'none' }}>
            <CommentItem
              comment={comment}
              activeKeys={activeKeys}
              setActiveKeys={setActiveKeys}
              setReplyToId={setReplyToId}
              renderReplies={renderReplies}
              isReply={false}
            />
          </List.Item>
        )}
      />

      <div>
        {replyToId && (
          <div
            style={{
              backgroundColor: '#f0f5ff',
              border: '1px solid #91d5ff',
              borderRadius: 6,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 12px',
            }}
          >
            <div>
              <Typography.Text>
                Replying to{' '}
                <Typography.Text strong>
                  {replyingToComment
                    ? `${replyingToComment.user?.firstName ?? ''} ${
                      replyingToComment.user?.lastName ?? ''
                    }`
                    : `comment #${replyToId}`}
                </Typography.Text>
              </Typography.Text>
            </div>
            <Button type="text" onClick={() => setReplyToId(null)}>
              Cancel
            </Button>
          </div>
        )}

        <Form form={form} layout="vertical" onFinish={handleFinish} style={{ marginTop: 16 }}>
          <Form.Item
            name="content"
            rules={[{ required: true, message: 'Please write a comment' }]}
          >
            <TextArea rows={3} placeholder="Write your comment..." />
          </Form.Item>

          <Form.Item>
            <Button type="primary" onClick={() => form.submit()} loading={loading} block>
              {replyToId ? 'Post Reply' : 'Post Comment'}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
