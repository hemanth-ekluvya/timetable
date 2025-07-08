import React from 'react';
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "./components/layout/AdminLayout";
import "./App.css";

import Dashboard from "./pages/Dashboard";
import UsersPage from "./pages/Users";
import SchoolsPage from "./pages/Schools";
import ClassesPage from "./pages/Classes";
import TimetablesPage from "./pages/Timetables";
import PapersettersPage from "./pages/PapersettersPage";
import SettingsPage from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          } />
          <Route path="/users" element={
            <AdminLayout>
              <UsersPage />
            </AdminLayout>
          } />
          <Route path="/schools" element={
            <AdminLayout>
              <SchoolsPage />
            </AdminLayout>
          } />
          <Route path="/classes" element={
            <AdminLayout>
              <ClassesPage />
            </AdminLayout>
          } />
          <Route path="/timetables" element={
            <AdminLayout>
              <TimetablesPage />
            </AdminLayout>
          } />
          <Route path="/papersetters" element={
            <AdminLayout>
              <PapersettersPage />
            </AdminLayout>
          } />
          <Route path="/settings" element={
            <AdminLayout>
              <SettingsPage />
            </AdminLayout>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;