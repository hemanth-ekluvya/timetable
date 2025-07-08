
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  School, 
  Calendar, 
  Settings,
  Menu,
  X
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../../components/ui/button';
import { useIsMobile } from '../../hooks/use-mobile';

const SidebarItem = ({ 
  icon: Icon, 
  label, 
  path,
  active, 
  onClick 
}) => {
  return (
    <li>
      <a 
        href={path}
        onClick={(e) => {
          e.preventDefault();
          onClick?.();
        }}
        className={cn("sidebar-item", active && "active")}
      >
        <Icon size={20} />
        <span>{label}</span>
      </a>
    </li>
  );
};

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const location = useLocation();
  
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Users, label: 'Users', path: '/users' },
    { icon: School, label: 'Schools', path: '/schools' },
    { icon: Calendar, label: 'Timetables', path: '/timetables' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const navigateTo = (path) => {
    navigate(path);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-sidebar fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 bg-primary">
          <h1 className="text-xl font-bold text-sidebar-foreground flex items-center gap-2">
            <School size={24} />
            <span>EduAdmin</span>
          </h1>
          {isMobile && (
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleSidebar}
              className="text-sidebar-foreground"
            >
              <X size={24} />
            </Button>
          )}
        </div>
        <nav className="mt-5 px-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <SidebarItem
                key={item.path}
                icon={item.icon}
                label={item.label}
                path={item.path}
                active={location.pathname === item.path}
                onClick={() => navigateTo(item.path)}
              />
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b bg-white px-4 shadow-sm">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleSidebar}
              className="lg:hidden"
            >
              <Menu size={24} />
            </Button>
            <h2 className="ml-2 text-lg font-medium">
              {navItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
            </h2>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Admin User</span>
            <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
