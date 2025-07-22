import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { Form, Input, Select, Button, DatePicker, Upload, Row, Col, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import API from '../../services/ApiService';

const { TextArea } = Input;
const url = import.meta.env.VITE_API_URL;
const socket = io('http://localhost:4005', { transports: ['websocket'], withCredentials: true });

const CreateTicket = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [assignees, setAssignees] = useState([]);
  const [user, setUser] = useState(null);

  const ticketTypes = [
    { label: 'Bug', value: '687b6d30111e035a524477e3' },
    { label: 'Feature', value: '687b6d30111e035a524477e4' }
  ];
  const projects = [
    { label: 'ERP System', value: '687b6e6de4af11132c401b4b' },
    { label: 'Website', value: '687b6e6de4af11132c401b4c' }
  ];
  const priorities = ['low', 'medium', 'high'];

  // ✅ Fetch logged-in user + assignees on mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Get logged-in user
        const res = await API.get('/users/me'); // assumes this route returns logged-in user
        setUser(res.data.user);

        // Get all assignees
        const userRes = await API.get('/users/admin/users');
        const users = userRes.data.users.map(u => ({
          label: u.fullname,
          value: u._id
        }));
        setAssignees(users);
      } catch (err) {
        console.error(err);
        message.error('Failed to fetch user or assignees.');
      }
    };

    fetchInitialData();

    // ✅ Join socket room
    socket.emit('join', '687b6217fece4c25bb1f6f01');

    return () => socket.disconnect();
  }, []);

  const handleFinish = async (values) => {
    if (!user) {
      message.error('User not authenticated');
      return;
    }

    setLoading(true);

    const payload = {
      priority: values.priority,
      status: 'open',
      tickettype: values.tickettype,
      description: values.description,
      title: values.title,
      project: values.project,
      department: '687b6c70396ec10da00bb862',
      assignee: values.assignee,
      creator: user._id,
      dueDate: values.dueDate.format('YYYY-MM-DD'),
    };

    try {
      await API.post('/ticket/create', payload);
      message.success('Ticket Created Successfully!');
      form.resetFields();
      socket.emit('ticketCreated', payload);
    } catch (error) {
      console.error('Error:', error);
      message.error(error.response?.data?.message || 'Failed to create ticket');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">Create New Ticket (with Socket)</h2>

      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Title" name="title" rules={[{ required: true }]}>
              <Input placeholder="Enter Ticket Title" />
            </Form.Item>
            <Form.Item label="Priority" name="priority" rules={[{ required: true }]}>
              <Select placeholder="Select Priority" options={priorities.map(p => ({ label: p.charAt(0).toUpperCase() + p.slice(1), value: p }))} />
            </Form.Item>
            <Form.Item label="Ticket Type" name="tickettype" rules={[{ required: true }]}>
              <Select placeholder="Select Ticket Type" options={ticketTypes} />
            </Form.Item>
            <Form.Item label="Due Date" name="dueDate" rules={[{ required: true }]}>
              <DatePicker className="w-full" format="YYYY-MM-DD" disabledDate={(current) => current && current < dayjs().startOf('day')} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Project" name="project" rules={[{ required: true }]}>
              <Select placeholder="Select Project" options={projects} />
            </Form.Item>
            <Form.Item label="Assignee" name="assignee" rules={[{ required: true }]}>
              <Select placeholder="Select Assignee" options={assignees} loading={!assignees.length} />
            </Form.Item>
            <Form.Item label="Description" name="description" rules={[{ required: true }]}>
              <TextArea rows={4} placeholder="Enter Ticket Description" />
            </Form.Item>
            <Form.Item label="Attachment" name="attachment" valuePropName="file">
              <Upload beforeUpload={() => false} maxCount={1}>
                <Button icon={<UploadOutlined />}>Click to Upload (Not linked)</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
        <div className="flex justify-end mt-4">
          <Button type="primary" htmlType="submit" loading={loading}>Create Ticket</Button>
        </div>
      </Form>
    </div>
  );
};

export default CreateTicket;
