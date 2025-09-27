

import React from 'react';
import { UsuarioProvider } from './context/usuarioContext';
import Formulario from './components/formulario/formulario';
import './App.css';

function App() {
  return (
    <UsuarioProvider>
      <div className="App">
        <Formulario />
      </div>
    </UsuarioProvider>
  );
}

export default App;