

import { getCountries } from './countryService';

global.fetch = jest.fn();

describe('Servicio de Países', () => {
  test('debería obtener lista de países', async () => {
    const paises = [
      { code: 'CO', name: 'Colombia', flag: '🇨🇴' },
      { code: 'AR', name: 'Argentina', flag: '🇦🇷' }
    ];

    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      json: async () => paises,
    } as Response);

    const resultado = await getCountries();

    expect(resultado).toHaveLength(2);
    expect(resultado[0].name).toBe('Colombia');
  });
});