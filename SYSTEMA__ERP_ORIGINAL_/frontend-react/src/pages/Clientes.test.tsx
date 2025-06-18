import React from 'react';
import { render, screen } from '@testing-library/react';
import Clientes from './Clientes';

describe('Clientes', () => {
  it('renders the logo, title, and client list card correctly', () => {
    render(<Clientes />);
    
    // Verifica se a logo está presente
    expect(screen.getByAltText('Logo COREL SYS')).toBeInTheDocument();
    
    // Verifica se o título "Clientes" está presente
    expect(screen.getByText('Clientes')).toBeInTheDocument();
    
    // Verifica se o card de lista de clientes está presente
    expect(screen.getByText('Lista de Clientes')).toBeInTheDocument();
  });
}); 