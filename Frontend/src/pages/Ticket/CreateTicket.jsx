import React, { useState } from 'react';
import { Form, Input, Select, Button, DatePicker, Upload, Row, Col, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { TextArea } = Input;

const CreateTicket = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Sample Data (replace with API calls)
  const ticketTypes = [{ label: 'Bug', value: 'bug' }, { label: 'Feature', value: 'feature' }];
  const projects = [{ label: 'ERP System', value: 'erp' }, { label: 'Website', value: 'website' }];
  const assignees = [{ label: 'Akshaya', value: 'akshaya' }, { label: 'John', value: 'john' }];
  const priorities = ['Low', 'Medium', 'High'];
 

  const handleFinish = (values) => {
    setLoading(true);
    console.log('Form Values:', values);
    setTimeout(() => {
      message.success('Ticket Created Successfully!');
      form.resetFields();
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">Create New Ticket</h2>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: 'Please enter title' }]}
            >
              <Input placeholder="Enter Ticket Title" />
            </Form.Item>

            <Form.Item
              label="Priority"
              name="priority"
              rules={[{ required: true, message: 'Please select priority' }]}
            >
              <Select placeholder="Select Priority" options={priorities.map(p => ({ label: p, value: p }))} />
            </Form.Item>

            <Form.Item
              label="Ticket Type"
              name="tickettype"
              rules={[{ required: true, message: 'Please select ticket type' }]}
            >
              <Select placeholder="Select Ticket Type" options={ticketTypes} />
            </Form.Item>

            <Form.Item
              label="Due Date"
              name="dueDate"
              rules={[{ required: true, message: 'Please select due date' }]}
            >
              <DatePicker className="w-full" format="YYYY-MM-DD" disabledDate={(current) => current && current < dayjs().startOf('day')} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Project"
              name="project"
              rules={[{ required: true, message: 'Please select project' }]}
            >
              <Select placeholder="Select Project" options={projects} />
            </Form.Item>

            <Form.Item
              label="Assignee"
              name="assignee"
              rules={[{ required: true, message: 'Please select assignee' }]}
            >
              <Select placeholder="Select Assignee" options={assignees} />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: 'Please enter description' }]}
            >
              <TextArea rows={4} placeholder="Enter Ticket Description" />
            </Form.Item>

            <Form.Item
              label="Attachment"
              name="attachment"
              valuePropName="file"
              getValueFromEvent={(e) => e.file}
            >
              <Upload beforeUpload={() => false} maxCount={1}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>

        <div className="flex justify-end mt-4">
          <Button type="primary" htmlType="submit" loading={loading}>
            Create Ticket
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CreateTicket;
