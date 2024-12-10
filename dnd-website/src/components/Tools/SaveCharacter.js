import { firestore } from '../../services/firebase';
import { setDoc, doc } from 'firebase/firestore';

const saveCharacter = async (character) => {
  const currentUser = localStorage.getItem('currentUser');
  if (currentUser) {
    try {
      const newCharacterRef = doc(firestore, 'characters', character.id);
      await setDoc(newCharacterRef, {
        ...character,
        userId: currentUser // Adiciona o ID do usuário logado
      });
      console.log('Personagem salvo com sucesso');
    } catch (error) {
      console.error('Erro ao salvar personagem: ', error);
    }
  }
};