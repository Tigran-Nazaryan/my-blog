// components/CreatePostModal.tsx

import React from "react";
import { Modal, Input } from "antd";

type CreatePostModalProps = {
  open: boolean;
  loading: boolean;
  title: string;
  body: string;
  onTitleChange: (value: string) => void;
  onBodyChange: (value: string) => void;
  onOk: () => void;
  onCancel: () => void;
};

const CreatePostModal: React.FC<CreatePostModalProps> = ({
                                                           open,
                                                           loading,
                                                           title,
                                                           body,
                                                           onTitleChange,
                                                           onBodyChange,
                                                           onOk,
                                                           onCancel,
                                                         }) => {
  return (
    <Modal
      title="Create Post"
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      confirmLoading={loading}
    >
      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        style={{ marginBottom: 12 }}
      />
      <Input.TextArea
        placeholder="Text"
        value={body}
        onChange={(e) => onBodyChange(e.target.value)}
        rows={4}
      />
    </Modal>
  );
};

export default CreatePostModal;
