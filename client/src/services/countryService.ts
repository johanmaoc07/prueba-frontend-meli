

import { Pais } from '../types';
import config from '../utils/config';


export const getCountries = async (): Promise<Pais[]> => {
  if (config.debug) {
    console.log('GET /countries');
  }
  
  const response = await fetch(`${config.apiUrl}/countries`);
  
  if (!response.ok) {
    throw new Error(`Error al obtener países: ${response.status}`);
  }
  
  return response.json();
};