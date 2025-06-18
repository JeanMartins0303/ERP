import React from 'react';
import { render, screen } from '@testing-library/react';
import Produtos from './Produtos';

describe('Produtos', () => {
  it('renders the logo, title, and product list card correctly', () => {
    render(<Produtos />);
    
    // Verifica se a logo está presente
    expect(screen.getByAltText('Logo COREL SYS')).toBeInTheDocument();
    
    // Verifica se o título "Produtos" está presente
    expect(screen.getByText('Produtos')).toBeInTheDocument();
    
    // Verifica se o card de lista de produtos está presente
    expect(screen.getByText('Lista de Produtos')).toBeInTheDocument();
  });
}); 