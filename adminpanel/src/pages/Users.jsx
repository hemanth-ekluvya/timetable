
import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Plus } from 'lucide-react';
import { UsersList } from '../components/users/UsersList';
import { toast } from 'sonner';

// Mock data for users
const mockUsers = [
  { 
    id: '1', 
    name: 'John Smith', 
    email: 'john.smith@example.com', 
    role: 'teacher', 
    school: 'High School West',
    status: 'active'
  },
  { 
    id: '2', 
    name: 'Sarah Johnson', 
    email: 'sarah.j@example.com', 
    role: 'teacher', 
    school: 'Elementary School East',
    status: 'active'
  },
  { 
    id: '3', 
    name: 'Mark Williams', 
    email: 'mark.w@example.com', 
    role: 'principal', 
    school: 'High School West',
    status: 'active'
  },
  { 
    id: '4', 
    name: 'Emma Davis', 
    email: 'emma.davis@example.com', 
    role: 'student', 
    school: 'High School West',
    status: 'active'
  },
  { 
    id: '5', 
    name: 'Alex Rodriguez', 
    email: 'alex.r@example.com', 
    role: 'student', 
    school: 'Elementary School East',
    status: 'inactive'
  },
  { 
    id: '6', 
    name: 'Michael Brown', 
    email: 'michael.b@example.com', 
    role: 'teacher', 
    school: 'Middle School Central',
    status: 'active'
  },
];

const UsersPage = () => {
  const [users, setUsers] = useState(mockUsers);

  const handleEdit = (user) => {
    // In a real app, this would open a modal or navigate to edit page
    toast.info(`Editing user: ${user.name}`);
  };

  const handleDelete = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
    toast.success('User successfully deleted');
  };

  const handleStatusChange = (userId, newStatus) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
    toast.success(`User status changed to ${newStatus}`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="page-title">Users</h1>
        <Button className="flex items-center gap-2">
          <Plus size={16} />
          <span>Add User</span>
        </Button>
      </div>

      <UsersList 
        users={users} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};

export default UsersPage;
