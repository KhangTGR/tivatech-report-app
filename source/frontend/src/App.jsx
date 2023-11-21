// import { BrowserRouter, Routes, Route } from "react-router-dom";

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
    <AdminTaskDetails></AdminTaskDetails>
  )
}

export default App
