import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table';
import { Button } from 'react-bootstrap';
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
import { Edit, MoreHorizontal, Trash, Calendar } from 'lucide-react';

export const PapersettersList = ({
  papersetters,
  onEdit,
  onDelete,
  onStatusChange,
  onViewPapers
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('all');

  const filteredPapersetters = papersetters.filter(papersetter => {
    const matchesSearch =
      papersetter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      papersetter.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      papersetter.subject.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSubject =
      subjectFilter === 'all' || papersetter.subject === subjectFilter;

    return matchesSearch && matchesSubject;
  });

  const uniqueSubjects = Array.from(new Set(papersetters.map(p => p.subject))).sort();

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search papersetters..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select
          value={subjectFilter}
          onValueChange={setSubjectFilter}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Subjects</SelectItem>
            {uniqueSubjects.map(subject => (
              <SelectItem key={subject} value={subject}>
                {subject}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Qualification</TableHead>
              <TableHead className="hidden md:table-cell">Experience</TableHead>
              <TableHead>School</TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPapersetters.length > 0 ? (
              filteredPapersetters.map((papersetter) => (
                <TableRow key={papersetter.id}>
                  <TableCell className="font-medium">{papersetter.name}</TableCell>
                  <TableCell>{papersetter.email}</TableCell>
                  <TableCell>{papersetter.subject}</TableCell>
                  <TableCell>{papersetter.qualification}</TableCell>
                  <TableCell className="hidden md:table-cell">{papersetter.experience} years</TableCell>
                  <TableCell>{papersetter.schoolName}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      papersetter.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {papersetter.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEdit?.(papersetter)}>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onViewPapers?.(papersetter.id)}>
                          <Calendar className="mr-2 h-4 w-4" />
                          <span>View Papers</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onStatusChange?.(papersetter.id, papersetter.status === 'active' ? 'inactive' : 'active')}>
                          <span>{papersetter.status === 'active' ? 'Deactivate' : 'Activate'}</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => onDelete?.(papersetter.id)}
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
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  No papersetters found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
