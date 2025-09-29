

import { useState, useEffect } from 'react';
import { es } from '../multilenguaje/es';
import { pt } from '../multilenguaje/pt';

const traducciones = { es, pt };

export const useLanguage = () => {
  const [idioma, setIdioma] = useState<'es' | 'pt'>('es');

  useEffect(() => {
    const dominio = window.location.hostname;
    const parametrosUrl = new URLSearchParams(window.location.search);
    const parametroIdioma = parametrosUrl.get('lang');
    
    if (parametroIdioma === 'pt' || 
        dominio.includes('mercadolivre.com.br') || 
        dominio.includes('.br')) {
      setIdioma('pt');
    } else {
      setIdioma('es');
    }
  }, []);

  const t = traducciones[idioma];

  return { idioma, t, setIdioma };
};