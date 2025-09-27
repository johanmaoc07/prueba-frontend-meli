


import { useState, useMemo, useCallback } from 'react';
import { Usuario, FormularioData } from '../types';
import { getUserData, updateUserData } from '../services/userService';
import { useUsuarioContext } from '../context/usuarioContext';

export const useUsuario = () => {
  const { usuario, setUsuario, isLoading, setIsLoading, error, setError } = useUsuarioContext();
  
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const loadUserData = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const userData = await getUserData(id);
      setUsuario(userData);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [setUsuario, setIsLoading, setError]);
  

  const validateData = useCallback((data: FormularioData): string[] => {
    const errors: string[] = [];
    
    if (!data.fullname || data.fullname.trim().length < 2) {
      errors.push('El nombre debe tener al menos 2 caracteres');
    }
    
    if (!data.address || data.address.trim().length < 5) {
      errors.push('La dirección debe tener al menos 5 caracteres');
    }
    
    if (!data.country) {
      errors.push('Debe seleccionar un país');
    }
    
    return errors;
  }, []);



  const updateUser = useCallback(async (id: string, data: FormularioData) => {
    const errors = validateData(data);
    setValidationErrors(errors);
    
    if (errors.length > 0) {
      return false; 
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const updatedUser = await updateUserData(id, data);
      setUsuario(updatedUser);
      
      return true; 
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al actualizar';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [validateData, setUsuario, setIsLoading, setError]);

  const userDisplayData = useMemo(() => {
    if (!usuario) return null;
    
    return {
      fullname: usuario.fullname,
      country: usuario.country,
      address: usuario.address,
      email: usuario.email,
    };
  }, [usuario]);

  return {
    usuario: userDisplayData,
    isLoading,
    error,
    validationErrors,
    loadUserData,
    updateUser,
    validateData,
  };
};