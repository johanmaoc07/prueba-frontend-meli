

import config from './config';

describe('Configuración', () => {
  test('debería tener configuración válida', () => {
    expect(config.apiUrl).toBeDefined();
    expect(config.captchaSiteKey).toBeDefined();
    expect(typeof config.debug).toBe('boolean');
  });
});