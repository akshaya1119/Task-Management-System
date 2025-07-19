import React, { useState } from 'react';
import { Table, Form, Input, Select, DatePicker, Button, Row, Col, Space } from 'antd';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

const ViewTicket = () => {
  const [form] = Form.useForm();
  const [filteredData, setFilteredData] = useState([]);

  // Dummy Data (replace with API)
  const tickets = [
    {
      key: 1,
      title: 'Fix login issue',
      priority: 'High',
      status: 'Open',
      tickettype: 'Bug',
      project: 'ERP System',
      department: 'Development',
      assignee: 'John',
      createdAt: '2025-07-15',
      dueDate: '2025-07-25'
    },
    {
      key: 2,
      title: 'Add export feature',
      priority: 'Medium',
      status: 'In Progress',
      tickettype: 'Feature',
      project: 'Website',
      department: 'Development',
      assignee: 'Akshaya',
      createdAt: '2025-07-10',
      dueDate: '2025-07-30'
    }
  ];

  const ticketTypes = ['Bug', 'Feature', 'Task'];
  const projects = ['ERP System', 'Website'];
  const departments = ['Development', 'Support'];
  const priorities = ['Low', 'Medium', 'High'];
  const statuses = ['Open', 'In Progress', 'Closed'];
  const assignees = ['John', 'Akshaya', 'Michael'];

  const columns = [
    { title: 'Title', dataIndex: 'title' },
    { title: 'Priority', dataIndex: 'priority' },
    { title: 'Status', dataIndex: 'status' },
    { title: 'Type', dataIndex: 'tickettype' },
    { title: 'Project', dataIndex: 'project' },
    { title: 'Department', dataIndex: 'department' },
    { title: 'Assignee', dataIndex: 'assignee' },
    { title: 'Created', dataIndex: 'createdAt' },
    { title: 'Due Date', dataIndex: 'dueDate' }
  ];

  const handleSearch = (values) => {
    let filtered = [...tickets];

    if (values.title) {
      filtered = filtered.filter(ticket =>
        ticket.title.toLowerCase().includes(values.title.toLowerCase())
      );
    }
    if (values.tickettype) {
      filtered = filtered.filter(ticket => ticket.tickettype === values.tickettype);
    }
    if (values.project) {
      filtered = filtered.filter(ticket => ticket.project === values.project);
    }
    if (values.department) {
      filtered = filtered.filter(ticket => ticket.department === values.department);
    }
    if (values.priority) {
      filtered = filtered.filter(ticket => ticket.priority === values.priority);
    }
    if (values.status) {
      filtered = filtered.filter(ticket => ticket.status === values.status);
    }
    if (values.assignee) {
      filtered = filtered.filter(ticket => ticket.assignee === values.assignee);
    }
    if (values.dateRange) {
      const [start, end] = values.dateRange;
      filtered = filtered.filter(ticket => {
        const created = dayjs(ticket.createdAt);
        return created.isAfter(start.startOf('day')) && created.isBefore(end.endOf('day'));
      });
    }

    setFilteredData(filtered);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">View Tickets</h2>

      <Form form={form} layout="vertical" onFinish={handleSearch}>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item name="title" label="Search Title/Description">
              <Input placeholder="Enter keywords" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item name="tickettype" label="Ticket Type">
              <Select placeholder="Select type" options={ticketTypes.map(t => ({ label: t, value: t }))} allowClear />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item name="project" label="Project">
              <Select placeholder="Select project" options={projects.map(p => ({ label: p, value: p }))} allowClear />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item name="department" label="Department">
              <Select placeholder="Select department" options={departments.map(d => ({ label: d, value: d }))} allowClear />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item name="priority" label="Priority">
              <Select placeholder="Select priority" options={priorities.map(p => ({ label: p, value: p }))} allowClear />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item name="status" label="Status">
              <Select placeholder="Select status" options={statuses.map(s => ({ label: s, value: s }))} allowClear />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item name="assignee" label="Assignee">
              <Select placeholder="Select assignee" options={assignees.map(a => ({ label: a, value: a }))} allowClear />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item name="dateRange" label="Created Date Range">
              <RangePicker className="w-full" />
            </Form.Item>
          </Col>
        </Row>

        <div className="flex justify-end space-x-2">
          <Button htmlType="submit" type="primary">Apply Filters</Button>
          <Button onClick={() => { form.resetFields(); setFilteredData([]); }}>Clear</Button>
        </div>
      </Form>

      <div className="mt-6">
        <Table columns={columns} dataSource={filteredData.length ? filteredData : tickets} bordered />
      </div>
    </div>
  );
};

export default ViewTicket;
