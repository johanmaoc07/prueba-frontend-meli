

import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { UsuarioProvider, useUsuarioContext } from '../context/usuarioContext';

// Wrapper para proveer el contexto
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <UsuarioProvider>{children}</UsuarioProvider>
);

describe('UsuarioContext', () => {
  test('debería inicializar con valores por defecto', () => {
    const { result } = renderHook(() => useUsuarioContext(), { wrapper });

    expect(result.current.usuario).toBe(null);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  test('debería actualizar el estado del usuario', () => {
    const { result } = renderHook(() => useUsuarioContext(), { wrapper });

    const nuevoUsuario = {
      id: 'user_123',
      fullname: 'Juan Pérez',
      email: 'juan@email.com',
      country: 'CO',
      address: 'Calle 123'
    };

    act(() => {
      result.current.setUsuario(nuevoUsuario);
    });

    expect(result.current.usuario).toEqual(nuevoUsuario);
  });

  test('debería manejar estados de carga', () => {
    const { result } = renderHook(() => useUsuarioContext(), { wrapper });

    act(() => {
      result.current.setIsLoading(true);
    });

    expect(result.current.isLoading).toBe(true);

    act(() => {
      result.current.setIsLoading(false);
    });

    expect(result.current.isLoading).toBe(false);
  });

  test('debería manejar errores', () => {
    const { result } = renderHook(() => useUsuarioContext(), { wrapper });

    const mensajeError = 'Error de prueba';

    act(() => {
      result.current.setError(mensajeError);
    });

    expect(result.current.error).toBe(mensajeError);

    act(() => {
      result.current.setError(null);
    });

    expect(result.current.error).toBe(null);
  });

  test('debería lanzar error si se usa fuera del Provider', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      renderHook(() => useUsuarioContext());
    }).toThrow('useUsuarioContext debe usarse dentro de UsuarioProvider');

    consoleSpy.mockRestore();
  });
});