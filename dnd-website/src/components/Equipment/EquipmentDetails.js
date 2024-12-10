import React from 'react';
import { useParams, Link } from 'react-router-dom';
import useApiData from '../../hooks/useApiData';
import { fetchEquipmentDetails } from '../../services/api';
import './Equipment.css';

const EquipmentDetails = () => {
  const { index } = useParams();
  const { data: equipment, loading, error } = useApiData(() => fetchEquipmentDetails(index));

  if (loading) return <p>Carregando detalhes do equipamento...</p>;
  if (error) return <p>Erro ao carregar detalhes do equipamento: {error}</p>;

  return (
    <div className="equipment-details">
      <h1>{equipment.name}</h1>
      <p><strong>Categoria:</strong> {equipment.equipment_category.name}</p>
      <p><strong>Custo:</strong> {equipment.cost?.quantity} {equipment.cost?.unit}</p>
      <p><strong>Peso:</strong> {equipment.weight} lbs</p>
      <p><strong>Descrição:</strong> {equipment.desc?.join(' ')}</p>

      <Link to="/equipment" className="back-button">Voltar para Lista de Equipamentos</Link>
    </div>
  );
};

export default EquipmentDetails;
