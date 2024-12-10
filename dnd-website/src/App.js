import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import CharacterList from './components/Character/CharacterList';
import CharacterForm from './components/Character/CharacterForm';
import CharacterSheet from './components/Character/CharacterSheet';
import EquipmentList from './components/Equipment/EquipmentList';
import EquipmentDetails from './components/Equipment/EquipmentDetails';
import MonsterList from './components/Monsters/MonsterList';
import MonsterDetails from './components/Monsters/MonsterDetails';
import SpellList from './components/Spells/SpellList';
import SpellDetails from './components/Spells/SpellDetails';
import User from './components/User/User';
import './App.css';

function App() {
  const [characters, setCharacters] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // useEffect para verificar o usuário logado ao carregar a aplicação
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(storedUser); // Atualiza o usuário se encontrado no localStorage
    }
  }, []); // A dependência vazia significa que isso acontece uma vez, no carregamento

  const handleSaveCharacter = (character) => {
    setCharacters((prevCharacters) => [...prevCharacters, character]);
  };

  return (
    <Router>
      <div className="App">
        <main className="content">
          <Routes>
            {/* Rotas Home */}
            <Route path="/" element={<Home />} />
            
            {/* Rotas de Personagens */}
            <Route path="/characters" element={<CharacterList characters={characters} />} />
            <Route path="/characters/create" element={<CharacterForm onSave={handleSaveCharacter} />} />
            <Route path="/characters/:id" element={<CharacterSheet characters={characters} />} />
            
            {/* Rotas de Equipamentos */}
            <Route path="/equipment" element={<EquipmentList />} />
            <Route path="/equipment/:index" element={<EquipmentDetails />} />

            {/* Rotas de Monstros */}
            <Route path="/monsters" element={<MonsterList />} />
            <Route path="/monsters/:index" element={<MonsterDetails />} />

            {/* Rotas de Feitiços */}
            <Route path="/spells" element={<SpellList />} />
            <Route path="/spells/:index" element={<SpellDetails />} />

            {/* Rota de Usuário */}
            <Route path="/user" element={<User setCurrentUser={setCurrentUser} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
