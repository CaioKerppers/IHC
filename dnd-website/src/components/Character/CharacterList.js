import React, { useState, useEffect } from 'react';  // Usando useState e useEffect
import { Link } from 'react-router-dom';
import { firestore } from '../../services/firebase';  // Importando Firestore
import { getAuth } from 'firebase/auth';  // Importando Auth do Firebase
import { collection, getDocs, query, where } from 'firebase/firestore';  // Importando métodos do Firestore
import './Character.css';

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      const user = getAuth().currentUser;

      if (!user) {
        alert('Você precisa estar logado para visualizar seus personagens.');
        return;
      }

      try {
        const q = query(
          collection(firestore, 'characters'),
          where('userId', '==', user.uid)  // Filtrando os personagens pelo userId
        );

        const querySnapshot = await getDocs(q);
        const charactersData = querySnapshot.docs.map(doc => ({
          id: doc.id,  // Incluindo o id do documento
          ...doc.data()
        }));

        setCharacters(charactersData);  // Atualiza o estado com os dados dos personagens
      } catch (error) {
        alert('Erro ao carregar personagens: ' + error.message);
      }
    };

    fetchCharacters();  // Chama a função para buscar os personagens
  }, []);  // A dependência vazia faz isso rodar apenas uma vez quando o componente for montado

  return (
    <div>
      <div className="character-list">
        <h2>Lista de Personagens</h2>

        {/* Botão para criar um novo personagem */}
        <Link to="/characters/create">
          <button className="create-button">Adicionar Herói</button>
        </Link>

        <ul>
          {characters.map((character) => (
            <li key={character.id} className="character-card">
              <span>
                {character.name} (Classe: {character.classType}, Raça: {character.race})
              </span>
              <Link to={`/characters/${character.id}`}>
                <button className="view-button">Ver Ficha</button>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Botão Voltar para Home */}
      <Link to="/" className="back-button">Voltar para Home</Link>
    </div>
  );
};

export default CharacterList;
