

import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { Usuario } from '../types';


interface UsuarioContextType {
  usuario: Usuario | null;
  setUsuario: (usuario: Usuario | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}


const UsuarioContext = createContext<UsuarioContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export const UsuarioProvider = ({ children }: Props) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);



  const value = useMemo(() => ({
    usuario,
    setUsuario,
    isLoading,
    setIsLoading,
    error,
    setError
  }), [usuario, isLoading, error]);


  return (
    <UsuarioContext.Provider value={value}>
      {children}
    </UsuarioContext.Provider>
  );
};


export const useUsuarioContext = () => {
  const context = useContext(UsuarioContext);
  if (context === undefined) {
    throw new Error('useUsuarioContext debe usarse dentro de UsuarioProvider');
  }
  return context;
};