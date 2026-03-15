import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';

describe('Pruebas básicas', () => {
  it('puede renderizar un componente simple', () => {
    const SimpleComponent = () => <div>Hola Mundo</div>;
    const { container } = render(<SimpleComponent />);
    expect(container.textContent).toBe('Hola Mundo');
  });

  it('puede verificar múltiples elementos', () => {
    const Component = () => (
      <div>
        <h1>Título</h1>
        <p>Párrafo</p>
      </div>
    );
    const { container } = render(<Component />);
    expect(container.querySelector('h1')?.textContent).toBe('Título');
    expect(container.querySelector('p')?.textContent).toBe('Párrafo');
  });

  it('puede manejar props', () => {
    interface Props {
      name: string;
    }
    const Greeting = ({ name }: Props) => <div>Hola {name}</div>;
    const { container } = render(<Greeting name="Juan" />);
    expect(container.textContent).toBe('Hola Juan');
  });
});
