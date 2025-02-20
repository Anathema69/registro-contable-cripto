// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      const { data } = await API.post('/auth/login', { email, password });
      // Guardar token, rol y nombre
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      if (data.name) {
        localStorage.setItem('userName', data.name);
      } else {
        localStorage.setItem('userName', 'Desconocido');
      }
      // Redirigir según rol
      if (data.role === 'admin') {
        navigate('/admin-reports');
      } else {
        navigate('/register-data');
      }
    } catch (error) {
      setErrorMsg(error.response?.data?.msg || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4 text-center">Iniciar Sesión</h1>
        {errorMsg && (
          <div className="bg-red-100 text-red-700 p-2 mb-4">{errorMsg}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="border w-full p-2"
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="border w-full p-2"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-black text-white w-full p-2 rounded hover:bg-gray-800"
          >
            Ingresar
          </button>
        </form>
        <p className="mt-4 text-center">
          ¿No tienes cuenta?{' '}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate('/register')}
          >
            Regístrate
          </span>
        </p>
      </div>
    </div>
  );
}
