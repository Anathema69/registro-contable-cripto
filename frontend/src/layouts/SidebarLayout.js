// src/layouts/SidebarLayout.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SidebarLayout({ children, role }) {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || '';
  const firstName = userName.split(' ')[0] || '';
  const displayName = `${role}-${firstName}`;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userName');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 bg-gray-900">
          <h2 className="text-lg font-bold">
            {displayName}
          </h2>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {role === 'user' && (
            <>
              <button
                className="block w-full text-left hover:bg-gray-700 p-2 rounded"
                onClick={() => navigate('/register-data')}
              >
                Registrar Datos
              </button>
              <button
                className="block w-full text-left hover:bg-gray-700 p-2 rounded"
                onClick={() => navigate('/operations')}
              >
                Registrar Operaciones
              </button>
            </>
          )}

          {role === 'admin' && (
            <>
              <button
                className="block w-full text-left hover:bg-gray-700 p-2 rounded"
                onClick={() => navigate('/admin-reports')}
              >
                Reportes
              </button>
              <button
                className="block w-full text-left hover:bg-gray-700 p-2 rounded"
                onClick={() => navigate('/register-user')}
              >
                Registrar Usuario
              </button>
            </>
          )}
        </nav>

        <div className="p-4">
          <button
            className="block w-full text-left bg-red-600 hover:bg-red-500 p-2 rounded"
            onClick={handleLogout}
          >
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 p-6 bg-gray-100">
        {children}
      </main>
    </div>
  );
}
