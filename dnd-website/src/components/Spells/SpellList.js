import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useApiData from '../../hooks/useApiData';
import { fetchSpells } from '../../services/api';
import './Spell.css';

const SpellList = () => {
  const { data: spells, loading, error } = useApiData(fetchSpells);
  const [search, setSearch] = useState('');

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredSpells = spells?.results.filter((spell) =>
    spell.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p>Carregando feitiços...</p>;
  if (error) return <p>Erro ao carregar feitiços: {error}</p>;

  return (
    <div className="spell-list">
      <h1>Lista de Feitiços</h1>
      <input
        type="text"
        placeholder="Buscar feitiço..."
        value={search}
        onChange={handleSearchChange}
      />
      <ul>
        {filteredSpells?.map((spell) => (
          <li key={spell.index}>
            <Link to={`/spells/${spell.index}`}>{spell.name}</Link>
          </li>
        ))}
      </ul>
      <Link to="/" className="back-button">Voltar para Home</Link>
    </div>
  );
};

export default SpellList;
