import React from 'react';
import { render, screen } from '@testing-library/react';
import Relatorios from './Relatorios';

describe('Relatorios', () => {
  it('renders the logo, title, and report list card correctly', () => {
    render(<Relatorios />);
    
    // Verifica se a logo está presente
    expect(screen.getByAltText('Logo COREL SYS')).toBeInTheDocument();
    
    // Verifica se o título "Relatórios" está presente
    expect(screen.getByText('Relatórios')).toBeInTheDocument();
    
    // Verifica se o card de lista de relatórios está presente
    expect(screen.getByText('Lista de Relatórios')).toBeInTheDocument();
  });
}); 