"use client";

import { useState } from "react";
import { Button } from "antd";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { likeComment, unlikeComment } from "@/services/commentService";

type Props = {
  commentId: number;
  initialCount: number;
  initialIsLiked: boolean;
};

const CommentLikeButton = ({ commentId, initialCount, initialIsLiked }: Props) => {
  const [liked, setLiked] = useState(initialIsLiked);
  const [count, setCount] = useState(initialCount);
  const [loading, setLoading] = useState(false);

  const toggleLike = async () => {
    setLoading(true);
    try {
      if (liked) {
        await unlikeComment(commentId);
        setCount((c) => c - 1);
      } else {
        await likeComment(commentId);
        setCount((c) => c + 1);
      }
      setLiked(!liked);
    } catch (error) {
      console.error("Failed to toggle comment like:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={toggleLike} disabled={loading} size="small">
      {liked ? <AiFillHeart color="red" size={20} /> : <AiOutlineHeart size={20} />}
      <span>{count}</span>
    </Button>
  );
};

export default CommentLikeButton;
