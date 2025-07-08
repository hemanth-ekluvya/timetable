
import React from 'react';
import { Calendar, School, User, Users } from 'lucide-react';
import { StatsCard } from '../components/dashboard/StatsCard';
import { Button } from 'react-bootstrap';

// Mock data for the dashboard
const mockStats = {
  totalSchools: 5,
  totalUsers: 1482,
  totalTeachers: 87,
  totalStudents: 1390,
};

const recentActivities = [
  { id: 1, message: "New timetable created for Class 10A", time: "2 hours ago" },
  { id: 2, message: "Teacher John Smith added to Science Department", time: "5 hours ago" },
  { id: 3, message: "Principal updated school details for High School West", time: "Yesterday" },
  { id: 4, message: "15 new students added to the system", time: "2 days ago" },
];

const Dashboard = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <h1 className="page-title">Dashboard</h1>
      
      {/* Stats section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="Total Schools" 
          value={mockStats.totalSchools} 
          icon={<School size={24} />} 
        />
        <StatsCard 
          title="Total Users" 
          value={mockStats.totalUsers} 
          icon={<Users size={24} />} 
        />
        <StatsCard 
          title="Teachers" 
          value={mockStats.totalTeachers} 
          icon={<User size={24} />} 
        />
        <StatsCard 
          title="Students" 
          value={mockStats.totalStudents} 
          icon={<User size={24} />} 
        />
      </div>

      {/* Quick actions and recent activities */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h2 className="section-title">Quick Actions</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Button className="flex items-center gap-2 h-auto py-4">
              <Users size={16} />
              <span>Add New User</span>
            </Button>
            <Button className="flex items-center gap-2 h-auto py-4">
              <School size={16} />
              <span>Add New School</span>
            </Button>
            <Button className="flex items-center gap-2 h-auto py-4" variant="outline">
              <Calendar size={16} />
              <span>Create Timetable</span>
            </Button>
            <Button className="flex items-center gap-2 h-auto py-4" variant="outline">
              <User size={16} />
              <span>Assign Teachers</span>
            </Button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h2 className="section-title">Recent Activities</h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="border-b pb-3 last:border-0 last:pb-0">
                <p className="text-sm">{activity.message}</p>
                <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
