'use client';

import { useEffect, useState } from "react";
import { getCommentsByPost, createComment } from "@/services/commentService";
import { Input, Button, List, Typography } from "antd";
import {Comment} from "@/types/post";

const { TextArea } = Input;

export default function CommentSection({ postId, userId }: { postId: number; userId: number }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadComments();
  }, [postId]);

  const loadComments = async () => {
    try {
      const data = await getCommentsByPost(postId);
      setComments(data);
    } catch (err) {
      console.error("Failed to load comments", err);
    }
  };

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

  console.log("commetn arr" ,comments)

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
