import React from 'react';
import { useParams, Link } from 'react-router-dom';
import useApiData from '../../hooks/useApiData';
import { fetchSpellDetails } from '../../services/api';
import './Spell.css';

const SpellDetails = () => {
  const { index } = useParams();
  const { data: spell, loading, error } = useApiData(() => fetchSpellDetails(index));

  if (loading) return <p>Carregando detalhes do feitiço...</p>;
  if (error) return <p>Erro ao carregar detalhes do feitiço: {error}</p>;

  return (
    <div className="spell-details">
      <h1>{spell.name}</h1>
      <p><strong>Nível:</strong> {spell.level}</p>
      <p><strong>Escola:</strong> {spell.school.name}</p>
      <p><strong>Duração:</strong> {spell.duration}</p>
      <p><strong>Componentes:</strong> {spell.components.join(', ')}</p>
      <p><strong>Descrição:</strong> {spell.desc.join(' ')}</p>

      <Link to="/spells" className="back-button">Voltar para Lista de Feitiços</Link>
    </div>
  );
};

export default SpellDetails;
