import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, firestore, createUserWithEmailAndPassword, signInWithEmailAndPassword, setDoc, doc } from '../../services/firebase'; // Corrigido para importar as funções necessárias
import './User.css';

const User = ({ setCurrentUser }) => {
  const [isLoginMode, setIsLoginMode] = useState(true); // Alternar entre login e registro
  const [formData, setFormData] = useState({ email: '', password: '', username: '' });
  const navigate = useNavigate(); // Para navegação após login ou registro

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLoginMode) {
        // Login com Firebase
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        alert('Login realizado com sucesso!');
        setCurrentUser(formData.email); // Define o usuário logado (email)
        navigate('/characters'); // Redireciona para a lista de personagens
      } else {
        // Registro com Firebase
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        const user = userCredential.user;

        // Salvar nome de usuário no Firestore após o registro
        await setDoc(doc(firestore, 'users', user.uid), {
          username: formData.username,
          email: formData.email,
        });

        alert('Cadastro realizado com sucesso!');
        setIsLoginMode(true); // Troca para o modo de login após registrar
      }
    } catch (error) {
      alert(error.message); // Exibe o erro caso haja
    }
  };

  return (
    <div className="user-form">
      <h2>{isLoginMode ? 'Login' : 'Registrar'}</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label>Senha:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {!isLoginMode && (
          <>
            <label>Nome de Usuário:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </>
        )}
        <button type="submit">{isLoginMode ? 'Entrar' : 'Registrar'}</button>
      </form>
      <div className="user-action-buttons">
        <button
          className="action-button"
          onClick={() => setIsLoginMode((prevMode) => !prevMode)}
        >
          {isLoginMode ? 'Criar Conta' : 'Já Tenho Conta'}
        </button>
      </div>

      {/* Botão de Voltar */}
      <Link to="/">
        <button className="back-button">Voltar para Home</button>
      </Link>
    </div>
  );
};

export default User;
