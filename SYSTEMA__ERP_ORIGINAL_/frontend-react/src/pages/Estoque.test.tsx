import React from 'react';
import { render, screen } from '@testing-library/react';
import Estoque from './Estoque';

describe('Estoque', () => {
  it('renders the logo, title, and stock list card correctly', () => {
    render(<Estoque />);
    
    // Verifica se a logo está presente
    expect(screen.getByAltText('Logo COREL SYS')).toBeInTheDocument();
    
    // Verifica se o título "Estoque" está presente
    expect(screen.getByText('Estoque')).toBeInTheDocument();
    
    // Verifica se o card de lista de estoque está presente
    expect(screen.getByText('Lista de Estoque')).toBeInTheDocument();
  });
}); 