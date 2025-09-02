'use client';

import React from 'react';
import {Collapse, Typography, Avatar, Button, Space} from 'antd';
import {Comment} from '@/types/post';
import CommentLikeBtn from '@/components/ui/btn/CommentLikeBtn';

const {Paragraph, Text} = Typography;

type CommentWithReplies = Comment & { replies: CommentWithReplies[] };

interface CommentItemProps {
  comment: CommentWithReplies;
  activeKeys: string[];
  setActiveKeys: React.Dispatch<React.SetStateAction<string[]>>;
  setReplyToId: (id: number) => void;
  renderReplies: (comment: CommentWithReplies) => React.ReactNode;
}

const CommentItem: React.FC<CommentItemProps> = ({comment, activeKeys, setActiveKeys, setReplyToId, renderReplies}) => {
  return (
    <Collapse
      key={comment.id}
      ghost
      expandIconPosition="end"
      activeKey={activeKeys}
      onChange={(keys) => setActiveKeys(keys as string[])}
      style={{width: '100%'}}
      items={[
        {
          key: comment.id,
          label: (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                minWidth: '100%',
              }}
            >
              <Space align="center">
                <Avatar size="small" style={{backgroundColor: '#87d068'}}>
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
                  key="like"
                  commentId={comment.id}
                  initialCount={comment.likesCount ?? 0}
                  initialIsLiked={comment.isLiked ?? false}
                />
                <Button
                  key="reply"
                  type="link"
                  onClick={(e) => {
                    e.stopPropagation();
                    setReplyToId(comment.id);
                    setActiveKeys((prev) =>
                      prev.includes(comment.id.toString()) ? prev : [...prev, comment.id.toString()]
                    );
                  }}
                >
                  Reply
                </Button>
              </Space>
            </div>
          ),
          children: (
            <>
              <Paragraph style={{marginBottom: 16}}>{comment.content}</Paragraph>

              {comment.replies.length > 0 ? (
                <div style={{paddingLeft: 32}}>
                  {comment.replies.map((reply) => renderReplies(reply))}
                </div>
              ) : (
                <Text type="secondary" style={{fontStyle: 'italic'}}>
                  No replies yet
                </Text>
              )}
            </>
          ),
          style: {
            backgroundColor: '#fafafa',
            borderRadius: 6,
            border: '1px solid #e8e8e8',
            marginBottom: '16px',
          },
        },
      ]}
    />
  );
};

export default CommentItem;
