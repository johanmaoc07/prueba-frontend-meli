

import React from 'react';
import { render, screen } from '@testing-library/react';
import { UsuarioProvider } from '../../context/usuarioContext';
import Formulario from './formulario';


jest.mock('react-google-recaptcha', () => {
  return function MockReCAPTCHA() {
    return <div data-testid="recaptcha">Mock reCAPTCHA</div>;
  };
});


jest.mock('../../hooks/useUsuario', () => ({
  useUsuario: () => ({
    usuario: {
      id: 'user_123',
      fullname: 'Juan Pérez',
      email: 'juan@email.com',
      country: 'CO',
      address: 'Calle 123'
    },
    isLoading: false,
    error: null,
    validationErrors: [],
    loadUserData: jest.fn(),
    updateUser: jest.fn(),
    validateData: jest.fn(() => [])
  })
}));

jest.mock('../../hooks/useCountries', () => ({
  useCountries: () => ({
    countryOptions: [
      { value: 'CO', label: '🇨🇴 Colombia' },
      { value: 'AR', label: '🇦🇷 Argentina' }
    ],
    isLoading: false,
    error: null
  })
}));


Object.defineProperty(window, 'location', {
  value: {
    search: '?referrer=/cart&token=123'
  },
  writable: true
});

describe('Componente Formulario', () => {
  test('renderiza elementos principales', () => {
    render(
      <UsuarioProvider>
        <Formulario />
      </UsuarioProvider>
    );

    expect(screen.getByText('Revisión de Datos')).toBeInTheDocument();
    expect(screen.getByText('Verifica que tu información este correcta')).toBeInTheDocument();
    expect(screen.getByText('Nombre completo')).toBeInTheDocument();
    expect(screen.getByText('País')).toBeInTheDocument();
    expect(screen.getByText('Dirección')).toBeInTheDocument();
  });

  test('renderiza botones correctamente', () => {
    render(
      <UsuarioProvider>
        <Formulario />
      </UsuarioProvider>
    );

    const botonContinuar = screen.getByRole('button', { name: /Continuar/ });
    const botonVolver = screen.getByRole('button', { name: /Volver/ });
    
    expect(botonContinuar).toBeInTheDocument();
    expect(botonVolver).toBeInTheDocument();
  });

  test('renderiza checkbox y captcha', () => {
    render(
      <UsuarioProvider>
        <Formulario />
      </UsuarioProvider>
    );

    expect(screen.getByText('Acepto que me contacten por SMS y WhatsApp.')).toBeInTheDocument();
    expect(screen.getByTestId('recaptcha')).toBeInTheDocument();
  });

  test('renderiza logo de MercadoLibre', () => {
    render(
      <UsuarioProvider>
        <Formulario />
      </UsuarioProvider>
    );

    const logo = screen.getByAltText('MercadoLibre');
    expect(logo).toBeInTheDocument();
  });

  test('botón continuar está deshabilitado inicialmente', () => {
    render(
      <UsuarioProvider>
        <Formulario />
      </UsuarioProvider>
    );

    const botonContinuar = screen.getByRole('button', { name: /Continuar/ });
    expect(botonContinuar).toBeDisabled();
  });
});