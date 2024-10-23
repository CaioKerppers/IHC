import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Contato from './pages/Contato';
import Produto from './pages/Produto';
import Erro from './pages/Erro';

import Header from './components/Header';
import Rodape from './components/Rodape';  

function RoutesApp(){
    return(
        <BrowserRouter>
            <Header/>

            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/sobre' element={<Sobre/>}/>
                <Route path='/contato' element={<Contato/>}/>
                <Route path='/produto' element={<Produto/>}/>

                <Route path="*" element={<Erro />} />
            </Routes>

            <Rodape />
        </BrowserRouter>
    );
}

export default RoutesApp;
