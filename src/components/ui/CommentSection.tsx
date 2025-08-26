'use client';

import { useState } from "react";
import { createComment } from "@/services/commentService";
import { Input, Button, List, Typography } from "antd";
import {Comment} from "@/types/post";

const { TextArea } = Input;

export default function CommentSection({ postId, userId, initialComments = [] }: { postId: number; userId: number; initialComments?: Comment[]; }) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!newComment.trim()) return;

    setLoading(true);
    try {
      const created = await createComment(postId, userId, newComment);
      setComments(prev => [...prev, created]);
      setNewComment("");
    } catch (err) {
      console.error("Failed to add comment", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <Typography.Title level={4}>Comments</Typography.Title>

      <List
        rowKey={(comment) => comment.id}
        dataSource={comments.filter((c) => c && c.id)}
        bordered
        renderItem={(comment) => (
          <List.Item key={comment.id}>
            <List.Item.Meta
              title={`${comment.user?.firstName ?? ""} ${comment.user?.lastName ?? ""}`}
              description={comment.content}
            />
          </List.Item>
        )}
      />

      <div style={{ marginTop: 16 }}>
        <TextArea
          rows={3}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write your comment..."
        />
        <Button
          type="primary"
          onClick={handleSubmit}
          loading={loading}
          style={{ marginTop: 8 }}
        >
          Post Comment
        </Button>
      </div>
    </div>
  );
}
