import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


import InnerLayout from "./layout/InnerLayout";
import OuterLayout from "./layout/OuterLayout";


import Login from "./pages/Login/Login";
import ForgetPassword from "./pages/Login/ForgetPassword";

import Dashboard from "./pages/Dashboard/Dashboard"

import CreateTicket from "./pages/Ticket/CreateTicket";
import ViewTicket from "./pages/Ticket/ViewTicket";


import KanbanBoard from "./pages/KanbanBoard/KanbanBoard";


import ViewUser from "./pages/User/ViewUser";
import PublicRoutes from './routes/PublicRoute';
import ProtectedRoutes from './routes/ProtectedRoute';
import SearchResults from './pages/Search/AdvancedSearch';
import Master from './pages/Masters/Master';

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Public Routes */}
        <Route
          element={
            <PublicRoutes>
              <OuterLayout />
            </PublicRoutes>
          }
        >
          <Route path="/login" element={<Login />} />
          <Route path="/forgot" element={<ForgetPassword />} />
        </Route>

        {/* Protected Routes with layout (for both /dashboard/* and /profile) */}
        <Route
          element={
            <ProtectedRoutes>
              <InnerLayout />
            </ProtectedRoutes>
          }
        >
          {/* Dashboard nested under /dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/add-ticket" element={<CreateTicket />} />
          <Route path="/dashboard/all-ticket" element={<ViewTicket />} />
          <Route path="/dashboard/masters" element={<Master />} />
          <Route path="/dashboard/kanban-board" element={<KanbanBoard />} />
          <Route path="/dashboard/search" element={<SearchResults />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;