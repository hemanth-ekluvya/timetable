import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../components/ui/select';
import { TimetableDisplay } from '../components/timetables/TimetableDisplay';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

// Mock data for timetable slots
const mockTimetableSlots = [
  { id: '1', day: 'Monday', period: 1, subject: 'Mathematics', teacher: 'John Smith', room: '101' },
  { id: '2', day: 'Monday', period: 2, subject: 'English', teacher: 'Sarah Johnson', room: '102' },
  { id: '3', day: 'Monday', period: 3, subject: 'Science', teacher: 'Michael Brown', room: '103' },
  { id: '4', day: 'Monday', period: 4, subject: 'History', teacher: 'Emma Davis', room: '104' },
  { id: '5', day: 'Tuesday', period: 1, subject: 'Geography', teacher: 'Sarah Johnson', room: '102' },
  { id: '6', day: 'Tuesday', period: 2, subject: 'Mathematics', teacher: 'John Smith', room: '101' },
  { id: '7', day: 'Tuesday', period: 3, subject: 'Physical Education', teacher: 'Alex Rodriguez', room: 'Gym' },
  { id: '8', day: 'Tuesday', period: 4, subject: 'Art', teacher: 'Lisa Wilson', room: '105' },
  { id: '9', day: 'Wednesday', period: 1, subject: 'English', teacher: 'Sarah Johnson', room: '102' },
  { id: '10', day: 'Wednesday', period: 2, subject: 'Science', teacher: 'Michael Brown', room: '103' },
  { id: '11', day: 'Wednesday', period: 3, subject: 'Mathematics', teacher: 'John Smith', room: '101' },
  { id: '12', day: 'Wednesday', period: 4, subject: 'Computer Science', teacher: 'David Clark', room: '106' },
  { id: '13', day: 'Thursday', period: 1, subject: 'History', teacher: 'Emma Davis', room: '104' },
  { id: '14', day: 'Thursday', period: 2, subject: 'Geography', teacher: 'Sarah Johnson', room: '102' },
  { id: '15', day: 'Thursday', period: 3, subject: 'English', teacher: 'Sarah Johnson', room: '102' },
  { id: '16', day: 'Thursday', period: 4, subject: 'Science', teacher: 'Michael Brown', room: '103' },
  { id: '17', day: 'Friday', period: 1, subject: 'Mathematics', teacher: 'John Smith', room: '101' },
  { id: '18', day: 'Friday', period: 2, subject: 'Physical Education', teacher: 'Alex Rodriguez', room: 'Gym' },
  { id: '19', day: 'Friday', period: 3, subject: 'Art', teacher: 'Lisa Wilson', room: '105' },
  { id: '20', day: 'Friday', period: 4, subject: 'Computer Science', teacher: 'David Clark', room: '106' },
];

const schools = [
  { id: '1', name: 'High School West' },
  { id: '2', name: 'Elementary School East' },
  { id: '3', name: 'Middle School Central' },
  { id: '4', name: 'Tech Academy' },
  { id: '5', name: 'Arts & Sciences School' },
];

const classes = [
  { id: '1', name: 'Class 10A', schoolId: '1' },
  { id: '2', name: 'Class 10B', schoolId: '1' },
  { id: '3', name: 'Class 11A', schoolId: '1' },
  { id: '4', name: 'Class 5A', schoolId: '2' },
  { id: '5', name: 'Class 5B', schoolId: '2' },
  { id: '6', name: 'Class 8A', schoolId: '3' },
  { id: '7', name: 'Class 9TECH', schoolId: '4' },
  { id: '8', name: 'Class 11ARTS', schoolId: '5' },
];

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const periods = [1, 2, 3, 4];

const TimetablesPage = () => {
  const [selectedSchool, setSelectedSchool] = useState('all');
  const [selectedClass, setSelectedClass] = useState('all');
  const [timetableSlots, setTimetableSlots] = useState(mockTimetableSlots);
  
  const filteredClasses = classes.filter(
    cls => selectedSchool === 'all' || cls.schoolId === selectedSchool
  );
  
  const handleCreateTimetable = () => {
    toast.info('Creating new timetable - this would open a timetable editor in a real app');
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="page-title">Timetables</h1>
        <Button className="flex items-center gap-2" onClick={handleCreateTimetable}>
          <Plus size={16} />
          <span>Create Timetable</span>
        </Button>
      </div>
      
      <div className="bg-white p-6 rounded-lg border shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-64">
            <label className="text-sm font-medium block mb-1">School</label>
            <Select
              value={selectedSchool}
              onValueChange={setSelectedSchool}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a school" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Schools</SelectItem>
                {schools.map(school => (
                  <SelectItem key={school.id} value={school.id}>
                    {school.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-full sm:w-64">
            <label className="text-sm font-medium block mb-1">Class</label>
            <Select
              value={selectedClass}
              onValueChange={setSelectedClass}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                {filteredClasses.map(cls => (
                  <SelectItem key={cls.id} value={cls.id}>
                    {cls.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {(selectedSchool !== 'all' || selectedClass !== 'all') ? (
          <TimetableDisplay 
            slots={timetableSlots} 
            days={days} 
            periods={periods}
            title={
              selectedClass !== 'all' ? 
                `Timetable for ${classes.find(c => c.id === selectedClass)?.name}` :
                `Timetable for ${schools.find(s => s.id === selectedSchool)?.name}`
            }
          />
        ) : (
          <div className="py-8 text-center text-muted-foreground">
            Select a school or class to view timetables
          </div>
        )}
      </div>
    </div>
  );
};

export default TimetablesPage;