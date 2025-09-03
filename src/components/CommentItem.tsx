import React from 'react';
import { Typography, Avatar, Button, Space, Collapse } from 'antd';
import { Comment } from '@/types/post';
import CommentLikeBtn from '@/components/ui/btn/CommentLikeBtn';

const { Paragraph, Text } = Typography;

type CommentWithReplies = Comment & { replies: CommentWithReplies[] };

interface CommentItemProps {
  comment: CommentWithReplies;
  activeKeys: string[];
  setActiveKeys: React.Dispatch<React.SetStateAction<string[]>>;
  setReplyToId: (id: number) => void;
  renderReplies: (comment: CommentWithReplies) => React.ReactNode;
  isReply?: boolean;
}

const CommentItem: React.FC<CommentItemProps> = ({comment, activeKeys, setActiveKeys, setReplyToId, renderReplies, isReply = false}) => {
  const commentIdStr = comment.id.toString();
  const isActive = activeKeys.includes(commentIdStr);

  const toggleCollapse = () => {
    setActiveKeys((prev) =>
      prev.includes(commentIdStr)
        ? prev.filter((key) => key !== commentIdStr)
        : [...prev, commentIdStr]
    );
  };

  return (
    <div
      key={comment.id}
      style={{
        backgroundColor: isReply ? '#f9f9f9' : '#fafafa',
        borderRadius: 6,
        border: '1px solid #e8e8e8',
        padding: '12px',
        marginBottom: '16px',
        marginLeft: isReply ? 16 : 0,
        width: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          minWidth: '100%',
        }}
      >
        <Space align="center">
          <Avatar size="small" style={{ backgroundColor: '#87d068' }}>
            {comment.user?.firstName?.[0]?.toUpperCase() ?? 'U'}
          </Avatar>
          <div>
            <Text strong>
              {comment.user?.firstName ?? ''} {comment.user?.lastName ?? ''}
            </Text>
          </div>
        </Space>

        <Space>
          <CommentLikeBtn
            commentId={comment.id}
            initialCount={comment.likesCount ?? 0}
            initialIsLiked={comment.isLiked ?? false}
          />
          <Button
            type="link"
            onClick={(e) => {
              e.stopPropagation();
              setReplyToId(comment.id);
              setActiveKeys((prev) =>
                prev.includes(commentIdStr) ? prev : [...prev, commentIdStr]
              );
            }}
          >
            Reply
          </Button>
        </Space>
      </div>

      <Paragraph style={{ marginTop: 12, marginBottom: 8 }}>{comment.content}</Paragraph>

      {comment.replies.length > 0 && (
        <Collapse
          ghost
          activeKey={isActive ? [commentIdStr] : []}
          onChange={toggleCollapse}
          items={[
            {
              key: commentIdStr,
              label: `Replies (${comment.replies.length})`,
              children: (
                <div>
                  {comment.replies.map((reply) => renderReplies(reply))}
                </div>
              ),
            },
          ]}
        />
      )}
    </div>
  );
};

export default CommentItem;
