import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Plus } from 'lucide-react';
import { PapersettersList } from '../components/papersetters/PapersettersList';
import { toast } from 'sonner';

// Mock data for papersetters
const mockPapersetters = [
  {
    id: '1',
    name: 'Dr. Alice Johnson',
    email: 'alice.johnson@example.com',
    subject: 'Mathematics',
    qualification: 'PhD in Mathematics',
    experience: 12,
    schoolId: '1',
    schoolName: 'High School West',
    status: 'active'
  },
  {
    id: '2',
    name: 'Prof. Robert Chen',
    email: 'robert.chen@example.com',
    subject: 'Physics',
    qualification: 'MSc in Physics',
    experience: 8,
    schoolId: '1',
    schoolName: 'High School West',
    status: 'active'
  },
  {
    id: '3',
    name: 'Dr. Maria Garcia',
    email: 'maria.garcia@example.com',
    subject: 'Chemistry',
    qualification: 'PhD in Chemistry',
    experience: 15,
    schoolId: '2',
    schoolName: 'Tech Academy',
    status: 'active'
  },
  {
    id: '4',
    name: 'Mr. James Wilson',
    email: 'james.wilson@example.com',
    subject: 'English',
    qualification: 'MA in English Literature',
    experience: 6,
    schoolId: '3',
    schoolName: 'Arts & Sciences School',
    status: 'inactive'
  },
];

const PapersettersPage = () => {
  const [papersetters, setPapersetters] = useState(mockPapersetters);

  const handleEdit = (papersetter) => {
    toast.info(`Editing papersetter: ${papersetter.name}`);
  };

  const handleDelete = (paperSetterId) => {
    setPapersetters(papersetters.filter(p => p.id !== paperSetterId));
    toast.success('Papersetter successfully deleted');
  };

  const handleStatusChange = (paperSetterId, newStatus) => {
    setPapersetters(papersetters.map(p =>
      p.id === paperSetterId ? { ...p, status: newStatus } : p
    ));
    toast.success(`Papersetter status changed to ${newStatus}`);
  };

  const handleViewPapers = (paperSetterId) => {
    const papersetter = papersetters.find(p => p.id === paperSetterId);
    toast.info(`Viewing papers for ${papersetter?.name}`);
  };

  const handleCreatePapersetter = () => {
    toast.info('Creating new papersetter - this would open a papersetter creation form in a real app');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="page-title">Papersetters</h1>
        <Button className="flex items-center gap-2" onClick={handleCreatePapersetter}>
          <Plus size={16} />
          <span>Add Papersetter</span>
        </Button>
      </div>

      <PapersettersList
        papersetters={papersetters}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
        onViewPapers={handleViewPapers}
      />
    </div>
  );
};

export default PapersettersPage;
