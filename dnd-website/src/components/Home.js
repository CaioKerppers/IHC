import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <h1>Bem-vindo ao D&D 5e Website</h1>
      <p>Explore recursos para montar fichas de personagem, visualizar monstros, feitiços e mais!</p>
      <nav>
        <Link to="/characters">Criar Ficha de Personagem</Link>
        <Link to="/monsters">Visualizar Monstros</Link>
        <Link to="/spells">Visualizar Feitiços</Link>
        <Link to="/equipment">Visualizar Equipamentos</Link>
        <Link to="/user">Acessar Perfil de Usuário</Link> 
      </nav>
    </div>
  );
};

export default Home;