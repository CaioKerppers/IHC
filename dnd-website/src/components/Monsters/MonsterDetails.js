import React from 'react';
import { useParams, Link } from 'react-router-dom';
import useApiData from '../../hooks/useApiData';
import { fetchMonsterDetails } from '../../services/api';
import './Monster.css';

const MonsterDetails = () => {
  const { index } = useParams();
  const { data: monster, loading, error } = useApiData(() => fetchMonsterDetails(index));

  if (loading) return <p>Carregando detalhes do monstro...</p>;
  if (error) return <p>Erro ao carregar detalhes do monstro: {error}</p>;

  return (
    <div className="monster-details">
      <h1>{monster.name}</h1>
      <p><strong>Pontos de Vida:</strong> {monster.hit_points}</p>
      <p><strong>Classe de Armadura:</strong> {monster.armor_class}</p>
      
      {/* Verificando se monster.type é um objeto e renderizando de forma segura */}
      <p><strong>Tipo:</strong> {monster.type ? monster.type : 'N/A'}</p>

      <p><strong>Desafio:</strong> {monster.challenge_rating}</p>

      {monster.special_abilities && (
        <>
          <h3>Habilidades Especiais</h3>
          <ul>
            {monster.special_abilities.map((ability) => (
              <li key={ability.name}>
                <strong>{ability.name}:</strong> {ability.desc}
              </li>
            ))}
          </ul>
        </>
      )}

      {monster.actions && (
        <>
          <h3>Ataques</h3>
          <ul>
            {monster.actions.map((action) => (
              <li key={action.name}>
                <strong>{action.name}:</strong> {action.desc}
              </li>
            ))}
          </ul>
        </>
      )}

      <Link to="/monsters" className="back-button">Voltar para Lista de Monstros</Link>
    </div>
  );
};

export default MonsterDetails;
