


import { useState, useEffect, useMemo } from 'react';
import { Pais } from '../types';
import { getCountries } from '../services/countryService';

export const useCountries = () => {
  const [countries, setCountries] = useState<Pais[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const loadCountries = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const countriesData = await getCountries();
        setCountries(countriesData);
        
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error al cargar países';
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    loadCountries();
  }, []); 


  const countryOptions = useMemo(() => {
    return countries.map(country => ({
      value: country.code,
      label: `${country.flag} ${country.name}`
    }));
  }, [countries]);

  
  const getCountryByCode = useMemo(() => {
    return (code: string) => {
      return countries.find(country => country.code === code);
    };
  }, [countries]);

  return {
    countries,
    countryOptions,
    isLoading,
    error,
    getCountryByCode,
  };
};