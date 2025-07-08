import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../ui/table';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../ui/select';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '../ui/dropdown-menu';
import { Edit, MoreHorizontal, Trash, Users, Calendar } from 'lucide-react';

export const ClassesList = ({ 
  classes, 
  onEdit, 
  onDelete,
  onViewStudents,
  onViewTimetable
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [gradeFilter, setGradeFilter] = useState('all');
  
  const filteredClasses = classes.filter(classData => {
    const matchesSearch = classData.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          classData.section.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          classData.schoolName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = gradeFilter === 'all' || classData.grade === gradeFilter;
    
    return matchesSearch && matchesGrade;
  });

  const uniqueGrades = Array.from(new Set(classes.map(c => c.grade))).sort();

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search classes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select
          value={gradeFilter}
          onValueChange={setGradeFilter}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by grade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Grades</SelectItem>
            {uniqueGrades.map((grade) => (
              <SelectItem key={grade} value={grade}>
                Grade {grade}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Class Name</TableHead>
              <TableHead>Section</TableHead>
              <TableHead>Grade</TableHead>
              <TableHead>School</TableHead>
              <TableHead>Class Teacher</TableHead>
              <TableHead className="hidden md:table-cell">Students</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClasses.length > 0 ? (
              filteredClasses.map((classData) => (
                <TableRow key={classData.id}>
                  <TableCell className="font-medium">{classData.name}</TableCell>
                  <TableCell>{classData.section}</TableCell>
                  <TableCell>Grade {classData.grade}</TableCell>
                  <TableCell>{classData.schoolName}</TableCell>
                  <TableCell>{classData.classTeacher}</TableCell>
                  <TableCell className="hidden md:table-cell">{classData.studentCount}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEdit?.(classData)}>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onViewStudents?.(classData.id)}>
                          <Users className="mr-2 h-4 w-4" />
                          <span>View Students</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onViewTimetable?.(classData.id)}>
                          <Calendar className="mr-2 h-4 w-4" />
                          <span>View Timetable</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-600" 
                          onClick={() => onDelete?.(classData.id)}
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No classes found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
