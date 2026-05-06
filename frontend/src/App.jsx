import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";

import RegisterPage from "./pages/RegisterPage";

import AdminDashboard from "./pages/AdminDashboard";

import MemberDashboard from "./pages/MemberDashboard";
import AdminRoute from "./components/AdminRoute";

import MemberRoute from "./components/MemberRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/member"
          element={
            <MemberRoute>
              <MemberDashboard />
            </MemberRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
