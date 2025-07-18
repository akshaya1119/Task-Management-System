import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Nav from '../../navbar/Nav';

const Dashboard = () => {
  const ticketStats = [
    {
      title: 'Total Tickets',
      value: 142,
      change: '+12% from last month',
      icon: '🎟️',
    },
    {
      title: 'Open Tickets',
      value: 38,
      change: '+3 from yesterday',
      icon: '⚠️',
    },
    {
      title: 'In Progress',
      value: 24,
      change: '-2 from yesterday',
      icon: '⏳',
    },
    {
      title: 'Completed',
      value: 80,
      change: '+8 from yesterday',
      icon: '✅',
    },
  ];

  const teamActivity = [
    {
      name: 'John Doe',
      activity: 'Completed TF-123',
      time: '2m ago',
      initials: 'JD',
      color: 'bg-purple-600',
    },
    {
      name: 'Alice Smith',
      activity: 'Created TF-124',
      time: '5m ago',
      initials: 'AS',
      color: 'bg-green-500',
    },
    {
      name: 'Mike Brown',
      activity: 'Moved TF-125 to testing',
      time: '8m ago',
      initials: 'MB',
      color: 'bg-yellow-500',
    },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Nav />

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex gap-2 items-center">
            <Input placeholder="Search tickets..." className="w-64" />
            <Button className="bg-blue-600 text-white">+ Create Ticket</Button>
          </div>
        </div>

        {/* Ticket Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {ticketStats.map((stat, i) => (
            <Card key={i} className="shadow-sm">
              <CardContent className="p-4">
                <div className="text-sm text-gray-500">{stat.title}</div>
                <div className="text-2xl font-semibold flex items-center gap-2">
                  {stat.value} <span>{stat.icon}</span>
                </div>
                <div className="text-xs text-green-500 mt-1">{stat.change}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts + Team Activity */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <Card className="col-span-2 h-60 flex items-center justify-center text-gray-400">
            <CardContent>
              <div className="text-center">
                <p className="text-lg">📊 Chart visualization would go here</p>
                <p className="text-sm">Show ticket creation and completion trends</p>
              </div>
            </CardContent>
          </Card>

          <Card className="h-60 overflow-auto">
            <CardContent className="p-4">
              <h3 className="text-lg font-medium mb-4">Team Activity</h3>
              <ul className="space-y-3">
                {teamActivity.map((act, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Avatar className={`${act.color} text-white w-8 h-8 flex items-center justify-center text-sm font-medium rounded-full`}>
                      {act.initials}
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{act.name}</p>
                      <p className="text-xs text-gray-500">{act.activity} · {act.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Kanban Preview Placeholder */}
        <Card>
          <CardContent className="p-4 flex justify-between items-center">
            <h3 className="text-lg font-medium">Kanban Board</h3>
            <select className="border rounded px-2 py-1">
              <option>All Projects</option>
            </select>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;