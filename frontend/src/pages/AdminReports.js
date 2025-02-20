// src/pages/AdminReports.js
import React, { useState, useEffect } from 'react';
import API from '../services/api';

export default function AdminReports() {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    // Cargar lista de usuarios
    const fetchUsers = async () => {
      try {
        const { data } = await API.get('/users'); 
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();

    // Fechas por defecto: hoy
    const today = new Date().toISOString().split('T')[0];
    setStartDate(today);
    setEndDate(today);
  }, []);

  const handleUserSelect = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleDownload = async () => {
    setErrorMsg('');
    try {
      let url = '/operations/export?';
      if (selectedUsers.length > 0) {
        const userIdsParam = selectedUsers.join(',');
        url += `filterUserId=${userIdsParam}&`;
      }
      if (startDate) url += `startDate=${startDate}&`;
      if (endDate) url += `endDate=${endDate}&`;

      const response = await API.get(url, {
        responseType: 'blob',
      });
      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', 'operations.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      setErrorMsg('Error al descargar el reporte');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Reportes de Operaciones</h1>
      {errorMsg && (
        <div className="bg-red-100 text-red-700 p-2 mb-4">{errorMsg}</div>
      )}

      {/* Multi-select de usuarios */}
      <div className="mb-4">
        <h2 className="font-semibold mb-2">Seleccionar Usuarios</h2>
        <p className="text-sm text-gray-600 mb-2">
          (Deja vacío para "todos" o selecciona varios)
        </p>
        <div className="max-h-32 overflow-auto border p-2 bg-white">
          {users.map((u) => (
            <label key={u._id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedUsers.includes(u._id)}
                onChange={() => handleUserSelect(u._id)}
              />
              <span>{u.name} ({u.email})</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rango de fechas */}
      <div className="flex space-x-2 mb-4">
        <div className="flex flex-col">
          <label className="text-sm">Fecha Inicio</label>
          <input
            className="border p-2"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Fecha Fin</label>
          <input
            className="border p-2"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      <button
        onClick={handleDownload}
        className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
      >
        Descargar CSV
      </button>
    </div>
  );
}
