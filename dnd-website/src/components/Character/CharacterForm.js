import React, { useState } from 'react';
import { auth, firestore } from '../../services/firebase';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import './Character.css'; // Importação do CSS

const CharacterForm = () => {
  const navigate = useNavigate();
  const [character, setCharacter] = useState({
    name: '',
    classType: '',
    race: '',
    alignment: '',
    level: 1,
    strength: 10,  // Atributo Força
    dexterity: 10, // Atributo Destreza
    constitution: 10, // Atributo Constituição
    intelligence: 10, // Atributo Inteligência
    wisdom: 10, // Atributo Sabedoria
    charisma: 10, // Atributo Carisma
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (!user) {
      alert('Você precisa estar logado para criar um personagem.');
      navigate('/login'); // Redireciona se não estiver logado
      return;
    }

    try {
      // Referência à coleção 'characters' no Firestore
      const charactersRef = collection(firestore, 'characters');

      // Adiciona o personagem ao Firestore
      await addDoc(charactersRef, {
        name: character.name,
        classType: character.classType,
        race: character.race,
        alignment: character.alignment,
        level: character.level,
        strength: character.strength,
        dexterity: character.dexterity,
        constitution: character.constitution,
        intelligence: character.intelligence,
        wisdom: character.wisdom,
        charisma: character.charisma,
        userId: user.uid, // Associa a ficha ao usuário logado
      });

      alert('Personagem criado com sucesso!');
      navigate('/characters'); // Redireciona para a lista de personagens
    } catch (error) {
      alert('Erro ao salvar personagem: ' + error.message);
    }
  };

  return (
    <div className="character-form">
      <h2>Criação de Personagem</h2>
      <form onSubmit={handleSubmit}>
        <label>Nome:</label>
        <input type="text" name="name" value={character.name} onChange={handleChange} required />

        <label>Classe:</label>
        <input type="text" name="classType" value={character.classType} onChange={handleChange} required />

        <label>Raça:</label>
        <input type="text" name="race" value={character.race} onChange={handleChange} required />

        <label>Alinhamento:</label>
        <input type="text" name="alignment" value={character.alignment} onChange={handleChange} required />

        <label>Nível:</label>
        <input type="number" name="level" value={character.level} onChange={handleChange} required />

        {/* Atributos */}
        <label>Força:</label>
        <input type="number" name="strength" value={character.strength} onChange={handleChange} required />

        <label>Destreza:</label>
        <input type="number" name="dexterity" value={character.dexterity} onChange={handleChange} required />

        <label>Constituição:</label>
        <input type="number" name="constitution" value={character.constitution} onChange={handleChange} required />

        <label>Inteligência:</label>
        <input type="number" name="intelligence" value={character.intelligence} onChange={handleChange} required />

        <label>Sabedoria:</label>
        <input type="number" name="wisdom" value={character.wisdom} onChange={handleChange} required />

        <label>Carisma:</label>
        <input type="number" name="charisma" value={character.charisma} onChange={handleChange} required />

        <button type="submit">Salvar Personagem</button>
      </form>
    </div>
  );
};

export default CharacterForm;
