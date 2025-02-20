// src/pages/RegisterUser.js
import React, { useState } from 'react';
import API from '../services/api';

export default function RegisterUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const { data } = await API.post('/auth/register', {
        name,
        email,
        password,
        role
      });
      setSuccessMsg('Usuario creado correctamente.');
      setName('');
      setEmail('');
      setPassword('');
      setRole('user');
    } catch (error) {
      setErrorMsg(error.response?.data?.msg || 'Error al registrar usuario');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Registrar Usuario (Admin)</h1>
      {errorMsg && (
        <div className="bg-red-100 text-red-700 p-2 mb-4">{errorMsg}</div>
      )}
      {successMsg && (
        <div className="bg-green-100 text-green-700 p-2 mb-4">{successMsg}</div>
      )}
      <form onSubmit={handleRegister} className="space-y-4 max-w-sm">
        <input
          className="border p-2 w-full"
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="border p-2 w-full"
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="border p-2 w-full"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label className="block">
          Rol:
          <select
            className="border w-full p-2 mt-1"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        <button
          type="submit"
          className="bg-black text-white w-full p-2 rounded hover:bg-gray-800"
        >
          Crear Usuario
        </button>
      </form>
    </div>
  );
}
