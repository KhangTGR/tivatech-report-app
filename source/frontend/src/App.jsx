import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css'

import UserTaskDetails from './pages/task-details/UserTaskDetails'
import AdminTaskDetails from './pages/task-details/AdminTaskDetails'
import AddTask from './pages/feature/AddTask'
import AdminDashboard from './pages/dashboard/AdminDashboard'
import UserDashboard from './pages/dashboard/UserDashboard'
import NoPage from "./pages/error/NoPage"
import SignIn from "./pages/sign-in/SignIn"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/:username/user/dashboard" element={<UserDashboard />} />
        <Route path="/:username/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/:username/admin/addtask" element={<AddTask />} />
        <Route path="/:username/user/:taskid" element={<UserTaskDetails />} />
        <Route path="/:username/admin/:taskid" element={<AdminTaskDetails />} />
        <Route path="/*" element={<NoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
