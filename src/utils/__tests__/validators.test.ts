import { describe, it, expect } from 'vitest';
import { validateEmail, validateSpanishPhone, validateSpanishPostalCode } from '../validators';

describe('validateEmail', () => {
  it('acepta emails válidos', () => {
    expect(validateEmail('usuario@ejemplo.com')).toBe(true);
    expect(validateEmail('test@test.es')).toBe(true);
    expect(validateEmail('email.valido@dominio.com')).toBe(true);
  });

  it('rechaza emails inválidos', () => {
    expect(validateEmail('email-invalido')).toBe(false);
    expect(validateEmail('sin@dominio')).toBe(false);
    expect(validateEmail('@sinusuario.com')).toBe(false);
    expect(validateEmail('')).toBe(false);
  });
});

describe('validateSpanishPhone', () => {
  it('acepta teléfonos españoles válidos', () => {
    expect(validateSpanishPhone('612345678')).toBe(true);
    expect(validateSpanishPhone('712345678')).toBe(true);
    expect(validateSpanishPhone('912345678')).toBe(true);
    expect(validateSpanishPhone('612 345 678')).toBe(true);
  });

  it('rechaza teléfonos inválidos', () => {
    expect(validateSpanishPhone('123456789')).toBe(false);
    expect(validateSpanishPhone('12345')).toBe(false);
    expect(validateSpanishPhone('512345678')).toBe(false);
    expect(validateSpanishPhone('')).toBe(false);
  });
});

describe('validateSpanishPostalCode', () => {
  it('acepta códigos postales españoles válidos', () => {
    expect(validateSpanishPostalCode('28001')).toBe(true);
    expect(validateSpanishPostalCode('08001')).toBe(true);
    expect(validateSpanishPostalCode('50001')).toBe(true);
  });

  it('rechaza códigos postales inválidos', () => {
    expect(validateSpanishPostalCode('60001')).toBe(false);
    expect(validateSpanishPostalCode('1234')).toBe(false);
    expect(validateSpanishPostalCode('123456')).toBe(false);
    expect(validateSpanishPostalCode('')).toBe(false);
  });
});
