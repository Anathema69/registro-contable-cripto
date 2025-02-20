// src/pages/UserOperations.js
import React, { useState, useEffect } from 'react';
import API from '../services/api';

export default function UserOperations() {
  const [operations, setOperations] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [showAll, setShowAll] = useState(false);

  const getOperations = async () => {
    try {
      const { data } = await API.get('/operations');
      setOperations(data); // data ordenada desc en backend
    } catch (error) {
      setErrorMsg('Error al obtener las operaciones');
    }
  };

  useEffect(() => {
    getOperations();
  }, []);

  // Muestra 3 o todas
  const displayedOperations = showAll ? operations : operations.slice(0, 3);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Operaciones</h1>
      {errorMsg && (
        <div className="bg-red-100 text-red-700 p-2 mb-4">{errorMsg}</div>
      )}

      <CreateOperationForm onSuccess={getOperations} />

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Listado de Operaciones</h2>
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">Tipo</th>
              <th className="py-2 px-4 border-b">Descripción</th>
              <th className="py-2 px-4 border-b">Monto</th>
              <th className="py-2 px-4 border-b">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {displayedOperations.map((op) => (
              <tr key={op._id} className="border-b">
                <td className="py-2 px-4">{op.type.toUpperCase()}</td>
                <td className="py-2 px-4">{op.description}</td>
                <td className="py-2 px-4">${op.amount}</td>
                <td className="py-2 px-4">
                  {new Date(op.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4">
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-800"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Mostrar solo las últimas 3' : 'Mostrar todas'}
          </button>
        </div>
      </div>
    </div>
  );
}

function CreateOperationForm({ onSuccess }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('ingreso');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      await API.post('/operations', { description, amount, type });
      setDescription('');
      setAmount('');
      setType('ingreso');
      onSuccess(); // Refresca la lista
    } catch (error) {
      setErrorMsg('Error al guardar la operación');
    }
  };

  return (
    <>
      <h3 className="text-lg font-semibold mb-2">Registrar Operación</h3>
      {errorMsg && (
        <div className="bg-red-100 text-red-700 p-2 mb-4">{errorMsg}</div>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 max-w-sm">
        <input
          className="border p-2"
          type="text"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          className="border p-2"
          type="number"
          step="0.01"
          placeholder="Monto"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <select
          className="border p-2"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="ingreso">Ingreso</option>
          <option value="egreso">Egreso</option>
        </select>
        <button
          type="submit"
          className="bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Guardar Operación
        </button>
      </form>
    </>
  );
}
