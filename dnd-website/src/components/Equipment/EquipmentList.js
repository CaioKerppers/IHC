import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useApiData from '../../hooks/useApiData';
import { fetchEquipment } from '../../services/api';
import './Equipment.css';

const EquipmentList = () => {
  const { data: equipment, loading, error } = useApiData(fetchEquipment);
  const [search, setSearch] = useState('');

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredEquipment = equipment?.results.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p>Carregando equipamentos...</p>;
  if (error) return <p>Erro ao carregar equipamentos: {error}</p>;

  return (
    <div className="equipment-list">
      <h1>Lista de Equipamentos</h1>
      <input
        type="text"
        placeholder="Buscar equipamento..."
        value={search}
        onChange={handleSearchChange}
      />
      <ul>
        {filteredEquipment?.map((item) => (
          <li key={item.index}>
            <Link to={`/equipment/${item.index}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
      <Link to="/" className="back-button">Voltar para Home</Link>
    </div>
  );
};

export default EquipmentList;
