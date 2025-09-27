

import { Usuario } from '../types';
import config from '../utils/config';


export const getUserData = async (id: string): Promise<Usuario> => {
  if (config.debug) {
    console.log(`GET /user/${id}`);
  }
  
  const response = await fetch(`${config.apiUrl}/user/${id}`);
  
  if (!response.ok) {
    throw new Error(`Error al obtener usuario: ${response.status}`);
  }
  
  return response.json();
};

export const updateUserData = async (id: string, userData: Partial<Usuario>): Promise<Usuario> => {
  if (config.debug) {
    console.log(`PUT /user/${id}`, userData);
  }

  const response = await fetch(`${config.apiUrl}/user/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error(`Error al actualizar usuario: ${response.status}`);
  }

  return response.json();
};