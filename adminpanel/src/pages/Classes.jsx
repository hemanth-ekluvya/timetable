import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Plus } from 'lucide-react';
import { ClassesList } from '../components/classes/ClassesList';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const mockClasses = [
  {
    id: '1',
    name: 'Mathematics Advanced',
    section: 'A',
    grade: '10',
    schoolId: '1',
    schoolName: 'High School West',
    studentCount: 28,
    classTeacher: 'John Smith'
  },
  {
    id: '2',
    name: 'Science General',
    section: 'B',
    grade: '10',
    schoolId: '1',
    schoolName: 'High School West',
    studentCount: 25,
    classTeacher: 'Sarah Johnson'
  },
  {
    id: '3',
    name: 'English Literature',
    section: 'A',
    grade: '11',
    schoolId: '1',
    schoolName: 'High School West',
    studentCount: 22,
    classTeacher: 'Emma Davis'
  },
  {
    id: '4',
    name: 'Primary Math',
    section: 'A',
    grade: '5',
    schoolId: '2',
    schoolName: 'Elementary School East',
    studentCount: 18,
    classTeacher: 'Michael Brown'
  },
  {
    id: '5',
    name: 'Primary Science',
    section: 'B',
    grade: '5',
    schoolId: '2',
    schoolName: 'Elementary School East',
    studentCount: 20,
    classTeacher: 'Lisa Wilson'
  },
];

const ClassesPage = () => {
  const [classes, setClasses] = useState(mockClasses);
  const navigate = useNavigate();

  const handleEdit = (classData) => {
    toast.info(`Editing class: ${classData.name} - Section ${classData.section}`);
  };

  const handleDelete = (classId) => {
    setClasses(classes.filter(cls => cls.id !== classId));
    toast.success('Class successfully deleted');
  };

  const handleViewStudents = (classId) => {
    const classData = classes.find(cls => cls.id === classId);
    toast.info(`Viewing students for ${classData?.name} - Section ${classData?.section}`);
  };

  const handleViewTimetable = (classId) => {
    navigate(`/timetables?class=${classId}`);
  };

  const handleCreateClass = () => {
    toast.info('Creating new class - this would open a class creation form in a real app');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="page-title">Classes & Sections</h1>
        <Button className="flex items-center gap-2" onClick={handleCreateClass}>
          <Plus size={16} />
          <span>Add Class</span>
        </Button>
      </div>

      <ClassesList 
        classes={classes} 
        onEdit={handleEdit} 
        onDelete={handleDelete}
        onViewStudents={handleViewStudents}
        onViewTimetable={handleViewTimetable}
      />
    </div>
  );
};

export default ClassesPage;
