

import { getUserData, updateUserData } from './userService';

global.fetch = jest.fn();

describe('Servicio de Usuario', () => {
  beforeEach(() => {
    (fetch as jest.MockedFunction<typeof fetch>).mockClear();
  });

  test('debería obtener datos del usuario', async () => {
    const datosUsuario = {
      id: 'user_123',
      fullname: 'Fanny Ortiz',
      country: 'CO',
      address: 'Calle 123'
    };

    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      json: async () => datosUsuario,
    } as Response);

    const resultado = await getUserData('user_123');

    expect(resultado).toEqual(datosUsuario);
  });

  test('debería actualizar datos del usuario', async () => {
    const datosActualizar = {
      fullname: 'Fanny Sierra',
      country: 'CO',
      address: 'Nueva dirección'
    };

    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 'user_123', ...datosActualizar }),
    } as Response);

    const resultado = await updateUserData('user_123', datosActualizar);

    expect(resultado.fullname).toBe('Fanny Sierra');
  });
});