import { Form, Input, Modal } from "antd";
import { useEffect } from "react";

interface CreatePostModalProps {
  open: boolean;
  loading: boolean;
  title: string;
  body: string;
  onTitleChange: (value: string) => void;
  onBodyChange: (value: string) => void;
  onOk: () => void;
  onCancel: () => void;
}

export default function CreatePostModal({ open, loading, title, body, onTitleChange, onBodyChange, onOk, onCancel }: CreatePostModalProps) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      form.setFieldsValue({ title, body });
    }
  }, [open, title, body, form]);

  const handleSubmit = () => {
    form
      .validateFields()
      .then(() => {
        onOk();
      })
      .catch((info) => {
        console.log("Validation Failed:", info);
      });
  };

  return (
    <Modal
      open={open}
      confirmLoading={loading}
      onOk={handleSubmit}
      onCancel={onCancel}
      title="Create a new post"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Title"
          name="title"
          rules={[
            { required: true, message: "Please enter a title" },
            { min: 3, message: "Title must be at least 3 characters" }
          ]}
        >
          <Input onChange={(e) => onTitleChange(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Text"
          name="body"
          rules={[
            { required: true, message: "Please enter the body of the post" }
          ]}
        >
          <Input.TextArea rows={4} onChange={(e) => onBodyChange(e.target.value)} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
