import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Páginas
import Login from './pages/Login';
import Register from './pages/Register';
import RegisterData from './pages/RegisterData';
import UserOperations from './pages/UserOperations';
import AdminReports from './pages/AdminReports';
import RegisterUser from './pages/RegisterUser';

// Rutas protegidas
import PrivateRoute from './routes/PrivateRoute';
import AdminRoute from './routes/AdminRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta principal: Login */}
        <Route path="/" element={<Login />} />

        {/* Registro para usuarios finales (rol user por defecto) */}
        <Route path="/register" element={<Register />} />

        {/* Rutas protegidas para usuarios con token (user o admin) */}
        <Route 
          path="/register-data" 
          element={
            <PrivateRoute>
              <RegisterData />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/operations" 
          element={
            <PrivateRoute>
              <UserOperations />
            </PrivateRoute>
          } 
        />

        {/* Rutas exclusivas para admin */}
        <Route 
          path="/admin-reports" 
          element={
            <AdminRoute>
              <AdminReports />
            </AdminRoute>
          } 
        />
        <Route 
          path="/register-user" 
          element={
            <AdminRoute>
              <RegisterUser />
            </AdminRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
