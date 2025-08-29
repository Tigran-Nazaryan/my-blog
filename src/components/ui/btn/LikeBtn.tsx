"use client";
import { useState } from "react";
import {apiRequest} from "@/lib/apiRequest";
import {Button} from "antd";
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

type Props = {
  postId: string;
  initialCount: number;
  initialIsLiked: boolean;
};

const LikeButton = ({ postId, initialCount, initialIsLiked }: Props) => {
  const [liked, setLiked] = useState(initialIsLiked);
  const [count, setCount] = useState(initialCount);
  const [loading, setLoading] = useState(false);

  const toggleLike = async () => {
    setLoading(true);

    try {
      if (liked) {
        await apiRequest(`/api/posts/${postId}/like`, {
          method: "DELETE",
        });
        setCount((c) => c - 1);
      } else {
        await apiRequest(`/api/posts/${postId}/like`, {
          method: "POST",
        });
        setCount((c) => c + 1);
      }

      setLiked(!liked);
    } catch (error) {
      console.error("Error like:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={toggleLike}
      disabled={loading}
    >
      {liked ? <AiFillHeart color="red" size={20} /> : <AiOutlineHeart size={20} />}
      <span>{count}</span>
    </Button>
  );
};

export default LikeButton;
