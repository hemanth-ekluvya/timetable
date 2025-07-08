
import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Plus } from 'lucide-react';
import { SchoolsList } from '../components/schools/SchoolsList';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

// Mock data for schools
const mockSchools = [
  {
    id: '1',
    name: 'High School West',
    address: '123 Education Blvd, West City',
    principalName: 'Mark Williams',
    studentCount: 850,
    teacherCount: 45
  },
  {
    id: '2',
    name: 'Elementary School East',
    address: '456 Learning Ave, East Town',
    principalName: 'Lisa Johnson',
    studentCount: 340,
    teacherCount: 22
  },
  {
    id: '3',
    name: 'Middle School Central',
    address: '789 Knowledge St, Central City',
    principalName: 'Robert Brown',
    studentCount: 520,
    teacherCount: 30
  },
  {
    id: '4',
    name: 'Tech Academy',
    address: '101 Innovation Way, Tech Park',
    principalName: 'Jennifer Lee',
    studentCount: 215,
    teacherCount: 18
  },
  {
    id: '5',
    name: 'Arts & Sciences School',
    address: '202 Creative Drive, Artsville',
    principalName: 'David Clark',
    studentCount: 310,
    teacherCount: 25
  },
];

const SchoolsPage = () => {
  const [schools, setSchools] = useState(mockSchools);
  const navigate = useNavigate();

  const handleEdit = (school) => {
    // In a real app, this would open a modal or navigate to edit page
    toast.info(`Editing school: ${school.name}`);
  };

  const handleDelete = (schoolId) => {
    setSchools(schools.filter(school => school.id !== schoolId));
    toast.success('School successfully deleted');
  };

  const handleViewTimetables = (schoolId) => {
    navigate(`/timetables?school=${schoolId}`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="page-title">Schools</h1>
        <Button className="flex items-center gap-2">
          <Plus size={16} />
          <span>Add School</span>
        </Button>
      </div>

      <SchoolsList 
        schools={schools} 
        onEdit={handleEdit} 
        onDelete={handleDelete}
        onViewTimetables={handleViewTimetables}
      />
    </div>
  );
};

export default SchoolsPage;
