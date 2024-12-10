import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { firestore } from '../../services/firebase';
import { getDoc, doc } from 'firebase/firestore';
import './Character.css';

const CharacterSheet = () => {
  const { id } = useParams();  // Obtém o ID do personagem da URL
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        console.log('Buscando personagem com ID:', id);  // Log para depuração

        // Referência ao documento do personagem no Firestore
        const characterRef = doc(firestore, 'characters', id);
        const characterDoc = await getDoc(characterRef);

        // Verifique se o documento existe
        if (characterDoc.exists()) {
          setCharacter(characterDoc.data());
          console.log('Personagem encontrado:', characterDoc.data());  // Log para depuração
        } else {
          alert('Personagem não encontrado.');
        }
      } catch (error) {
        alert('Erro ao carregar personagem: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [id]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!character) {
    return <p>Personagem não encontrado.</p>;
  }

  return (
    <div className="container">
      <div className="character-sheet box-with-button">
        <h2>Ficha de Personagem: {character.name}</h2>
        <p><strong>Classe:</strong> {character.classType}</p>
        <p><strong>Raça:</strong> {character.race}</p>
        <p><strong>Alinhamento:</strong> {character.alignment}</p>
        <p><strong>Nível:</strong> {character.level}</p>

        <div className="attribute-section">
          <div className="attribute-box">
            <h4>Força</h4>
            <p>{character.strength}</p>
          </div>

          <div className="attribute-box">
            <h4>Destreza</h4>
            <p>{character.dexterity}</p>
          </div>

          <div className="attribute-box">
            <h4>Constituição</h4>
            <p>{character.constitution}</p>
          </div>

          <div className="attribute-box">
            <h4>Inteligência</h4>
            <p>{character.intelligence}</p>
          </div>

          <div className="attribute-box">
            <h4>Sabedoria</h4>
            <p>{character.wisdom}</p>
          </div>

          <div className="attribute-box">
            <h4>Carisma</h4>
            <p>{character.charisma}</p>
          </div>
        </div>

        <Link to="/characters" className="back-button">
          Voltar para Lista
        </Link>
      </div>
    </div>
  );
};

export default CharacterSheet;
