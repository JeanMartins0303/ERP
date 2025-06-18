import React from 'react';
import { render, screen } from '@testing-library/react';
import Configuracoes from './Configuracoes';

describe('Configuracoes', () => {
  it('renders the logo, title, and settings card correctly', () => {
    render(<Configuracoes />);
    
    // Verifica se a logo está presente
    expect(screen.getByAltText('Logo COREL SYS')).toBeInTheDocument();
    
    // Verifica se o título "Configurações" está presente
    expect(screen.getByText('Configurações')).toBeInTheDocument();
    
    // Verifica se o card de configurações está presente
    expect(screen.getByText('Configurações do Sistema')).toBeInTheDocument();
  });
}); 