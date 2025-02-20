// src/pages/RegisterData.js
import React, { useState, useEffect } from 'react';
import API from '../services/api';

export default function RegisterData() {
  const [birthdate, setBirthdate] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    // Opcional: podrías cargar los datos del usuario si ya existen
    // Ejemplo:
    // const fetchUserData = async () => {
    //   try {
    //     const { data } = await API.get('/users/me');
    //     setBirthdate(data.birthdate || '');
    //     setAccountNumber(data.accountNumber || '');
    //     setPhone(data.phone || '');
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
    // fetchUserData();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    try {
      await API.put('/users/me', {
        birthdate,
        accountNumber,
        phone
      });
      setSuccessMsg('Datos guardados correctamente.');
    } catch (error) {
      setErrorMsg('Error al guardar los datos.');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Registrar Datos</h1>
      {errorMsg && (
        <div className="bg-red-100 text-red-700 p-2 mb-4">{errorMsg}</div>
      )}
      {successMsg && (
        <div className="bg-green-100 text-green-700 p-2 mb-4">{successMsg}</div>
      )}
      <form onSubmit={handleSave} className="space-y-4 max-w-sm">
        <label className="block">
          Fecha de Nacimiento
          <input
            className="border p-2 w-full mt-1"
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
          />
        </label>
        <label className="block">
          Nro de Cuenta
          <input
            className="border p-2 w-full mt-1"
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
          />
        </label>
        <label className="block">
          Teléfono
          <input
            className="border p-2 w-full mt-1"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>
        <button
          type="submit"
          className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
        >
          Guardar
        </button>
      </form>
    </div>
  );
}
