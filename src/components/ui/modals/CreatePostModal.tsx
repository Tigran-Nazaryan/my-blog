import React, {useEffect, useRef, useState} from 'react';
import {Form, Input, InputRef, Modal} from 'antd';
import { createPost } from '@/services/postServices';
import { toast } from 'react-toastify';
import {Post} from "@/types/post";

interface CreatePostModalProps {
  open: boolean;
  onCreated: (newPost: Post) => void;
  onCancel: () => void;
}

export default function CreatePostModal({ open, onCreated, onCancel }: CreatePostModalProps) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const titleInputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (open) {
      form.resetFields();
      setTimeout(() => {
        titleInputRef.current?.focus();
      }, 50);
    }
  }, [open, form]);

  const handleFinish = async (values: { title: string; body: string }) => {
    setLoading(true);
    try {
      const newPost = await createPost({
        title: values.title,
        body: values.body,
        author: "Admin",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
      });
      toast.success("Post successfully created");
      onCreated(newPost);
      onCancel();
    } catch {
      toast.error("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      confirmLoading={loading}
      onCancel={onCancel}
      onOk={() => form.submit()}
      title="Create a new post"
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="Title"
          name="title"
          rules={[
            { required: true, message: "Please enter a title" },
            { min: 3, message: "Title must be at least 3 characters" }
          ]}
        >
          <Input ref={titleInputRef} />
        </Form.Item>

        <Form.Item
          label="Text"
          name="body"
          rules={[{ required: true, message: "Please enter the body of the post" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
