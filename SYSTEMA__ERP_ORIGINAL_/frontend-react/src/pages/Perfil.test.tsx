import React from 'react';
import { render, screen } from '@testing-library/react';
import Perfil from './Perfil';

describe('Perfil', () => {
  it('renders the logo, title, and profile information card correctly', () => {
    render(<Perfil />);
    
    // Verifica se a logo está presente
    expect(screen.getByAltText('Logo COREL SYS')).toBeInTheDocument();
    
    // Verifica se o título "Perfil" está presente
    expect(screen.getByText('Perfil')).toBeInTheDocument();
    
    // Verifica se o card de informações do perfil está presente
    expect(screen.getByText('Informações do Perfil')).toBeInTheDocument();
  });
}); 