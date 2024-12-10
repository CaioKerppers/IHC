// src/components/Monsters/MonsterList.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useApiData from '../../hooks/useApiData';
import { fetchMonsters } from '../../services/api';
import './Monster.css';

const MonsterList = () => {
  const { data: monsters, loading, error } = useApiData(fetchMonsters);
  const [search, setSearch] = useState('');

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredMonsters = monsters?.results?.filter((monster) =>
    monster.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p>Carregando monstros...</p>;
  if (error) return <p>Erro ao carregar monstros: {error}</p>;

  return (
    <div className="monster-list">
      <h1>Lista de Monstros</h1>
      <input
        type="text"
        placeholder="Buscar monstro..."
        value={search}
        onChange={handleSearchChange}
        className="search-input"
      />
      <div className="monster-grid">
        {filteredMonsters?.map((monster) => (
          <div key={monster.index} className="monster-card">
            <Link to={`/monsters/${monster.index}`} className="monster-link">
              <h2>{monster.name}</h2>
              <p>Tipo: {monster.type || 'N/A'}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonsterList;
