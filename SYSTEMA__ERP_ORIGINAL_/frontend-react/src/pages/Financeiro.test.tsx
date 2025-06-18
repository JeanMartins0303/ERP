import React from 'react';
import { render, screen } from '@testing-library/react';
import Financeiro from './Financeiro';

describe('Financeiro', () => {
  it('renders the logo, title, and transaction list card correctly', () => {
    render(<Financeiro />);
    
    // Verifica se a logo está presente
    expect(screen.getByAltText('Logo COREL SYS')).toBeInTheDocument();
    
    // Verifica se o título "Financeiro" está presente
    expect(screen.getByText('Financeiro')).toBeInTheDocument();
    
    // Verifica se o card de lista de transações está presente
    expect(screen.getByText('Lista de Transações')).toBeInTheDocument();
  });
}); 