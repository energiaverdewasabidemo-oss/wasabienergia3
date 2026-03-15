# Guía de Testing

Este proyecto utiliza **Vitest** y **React Testing Library** para las pruebas.

## Comandos Disponibles

```bash
# Ejecutar todas las pruebas una vez
npm test

# Ejecutar pruebas en modo watch (se re-ejecutan al guardar)
npm test -- --watch

# Ejecutar pruebas con interfaz visual
npm run test:ui

# Generar reporte de cobertura
npm run test:coverage
```

## Estructura de Pruebas

```
src/
├── components/
│   └── __tests__/          # Pruebas de componentes
│       └── simple.test.tsx
├── utils/
│   ├── __tests__/          # Pruebas de utilidades
│   │   └── validators.test.ts
│   └── validators.ts
└── test/
    └── setup.ts            # Configuración global de pruebas
```

## Ejemplos de Pruebas

### Prueba Simple de Componente

```typescript
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';

describe('MiComponente', () => {
  it('renderiza correctamente', () => {
    const { container } = render(<MiComponente />);
    expect(container.textContent).toBe('Texto esperado');
  });
});
```

### Prueba de Función Utilitaria

```typescript
import { describe, it, expect } from 'vitest';
import { miFuncion } from '../utils';

describe('miFuncion', () => {
  it('retorna el resultado correcto', () => {
    expect(miFuncion('input')).toBe('output');
  });
});
```

## Validadores Disponibles

El proyecto incluye validadores para formularios en `src/utils/validators.ts`:

- `validateEmail(email: string)` - Valida formato de email
- `validateSpanishPhone(phone: string)` - Valida teléfonos españoles
- `validateSpanishPostalCode(postalCode: string)` - Valida códigos postales españoles

## Cobertura de Pruebas

Las pruebas actuales cubren:
- Renderizado básico de componentes
- Validación de emails
- Validación de teléfonos españoles
- Validación de códigos postales

## Notas Importantes

- Las pruebas se ejecutan en el entorno jsdom que simula un navegador
- IntersectionObserver está mockeado globalmente para evitar errores
- Los componentes con animaciones complejas pueden requerir configuración adicional

## Recursos

- [Vitest](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Library - Query Cheatsheet](https://testing-library.com/docs/queries/about/)
