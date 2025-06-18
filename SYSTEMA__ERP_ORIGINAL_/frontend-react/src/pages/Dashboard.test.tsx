import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from './Dashboard';

describe('Dashboard', () => {
  it('renders the logo, title, cards, and chart correctly', () => {
    render(<Dashboard />);
    
    // Verifica se a logo está presente
    expect(screen.getByAltText('Logo COREL SYS')).toBeInTheDocument();
    
    // Verifica se o título "Dashboard" está presente
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    
    // Verifica se os cards de indicadores estão presentes
    expect(screen.getByText('Vendas')).toBeInTheDocument();
    expect(screen.getByText('Pedidos')).toBeInTheDocument();
    expect(screen.getByText('Clientes')).toBeInTheDocument();
    expect(screen.getByText('Receita')).toBeInTheDocument();
    
    // Verifica se o gráfico está presente (verificando o título do gráfico)
    expect(screen.getByText('Gráfico de Vendas e Pedidos')).toBeInTheDocument();
  });
}); 