import axios from 'axios';

const API_BASE_URL = 'https://www.dnd5eapi.co/api';

// Funções de Monstros (já existentes)
export const fetchMonsters = async () => {
  const response = await axios.get(`${API_BASE_URL}/monsters`);
  return response.data;
};

export const fetchMonsterDetails = async (index) => {
  const response = await axios.get(`${API_BASE_URL}/monsters/${index}`);
  return response.data;
};

// Funções de Feitiços
export const fetchSpells = async () => {
  const response = await fetch('https://www.dnd5eapi.co/api/spells');
  if (!response.ok) throw new Error('Erro ao buscar feitiços');
  return response.json();
};

export const fetchSpellDetails = async (index) => {
  const response = await fetch(`https://www.dnd5eapi.co/api/spells/${index}`);
  if (!response.ok) throw new Error('Erro ao buscar detalhes do feitiço');
  return response.json();
};

// Funções de Equipamentos
export const fetchEquipment = async () => {
  const response = await axios.get(`${API_BASE_URL}/equipment`);
  return response.data;
};

export const fetchEquipmentDetails = async (index) => {
  const response = await axios.get(`${API_BASE_URL}/equipment/${index}`);
  return response.data;
};


