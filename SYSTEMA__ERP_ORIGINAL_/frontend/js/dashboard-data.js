import CONFIG from './config.js';
import { notifications } from './notifications.js';

class DashboardData {
    constructor() {
        this.cache = new Map();
        this.cacheTimeout = CONFIG.CACHE.DURATION;
        this.baseUrl = '/api/dashboard';
    }

    async fetchData(endpoint, useCache = true) {
        const cacheKey = endpoint;
        
        if (useCache && this.cache.has(cacheKey)) {
            const cachedData = this.cache.get(cacheKey);
            if (Date.now() - cachedData.timestamp < this.cacheTimeout) {
                return cachedData.data;
            }
        }

        try {
            const response = await fetch(`${CONFIG.API_URL}/${endpoint}`);
            if (!response.ok) throw new Error('Erro ao buscar dados');
            
            const data = await response.json();
            
            if (useCache) {
                this.cache.set(cacheKey, {
                    data,
                    timestamp: Date.now()
                });
            }
            
            return data;
        } catch (error) {
            notifications.error('Erro ao carregar dados do dashboard');
            console.error('Erro ao buscar dados:', error);
            return null;
        }
    }

    async getKPIs() {
        return await this.fetchData('dashboard/kpis');
    }

    async getVendasPorCategoria(periodo) {
        return await this.fetchData(`dashboard/vendas/categoria?periodo=${periodo}`);
    }

    async getVendasPorPeriodo(periodo) {
        return await this.fetchData(`dashboard/vendas/periodo?periodo=${periodo}`);
    }

    async getProdutosMaisVendidos(periodo) {
        return await this.fetchData(`dashboard/produtos/mais-vendidos?periodo=${periodo}`);
    }

    async getAlertas() {
        return await this.fetchData('dashboard/alertas');
    }

    async getMetricasOperacionais() {
        return await this.fetchData('dashboard/metricas-operacionais');
    }

    async getPrevisaoVendas() {
        try {
            const response = await fetch(`${this.baseUrl}/previsao-vendas`);
            if (!response.ok) throw new Error('Erro ao buscar previsão de vendas');
            return await response.json();
        } catch (error) {
            console.error('Erro ao buscar previsão de vendas:', error);
            return this.getMockPrevisaoVendas();
        }
    }

    async getTendencias() {
        try {
            const response = await fetch(`${this.baseUrl}/tendencias`);
            if (!response.ok) throw new Error('Erro ao buscar tendências');
            return await response.json();
        } catch (error) {
            console.error('Erro ao buscar tendências:', error);
            return this.getMockTendencias();
        }
    }

    async getRecomendacoesEstoque() {
        try {
            const response = await fetch(`${this.baseUrl}/recomendacoes-estoque`);
            if (!response.ok) throw new Error('Erro ao buscar recomendações de estoque');
            return await response.json();
        } catch (error) {
            console.error('Erro ao buscar recomendações de estoque:', error);
            return this.getMockRecomendacoesEstoque();
        }
    }

    async getOtimizacaoPrecos() {
        try {
            const response = await fetch(`${this.baseUrl}/otimizacao-precos`);
            if (!response.ok) throw new Error('Erro ao buscar otimização de preços');
            return await response.json();
        } catch (error) {
            console.error('Erro ao buscar otimização de preços:', error);
            return this.getMockOtimizacaoPrecos();
        }
    }

    // Dados mockados para desenvolvimento
    getMockPrevisaoVendas() {
        const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];
        return {
            labels: meses,
            vendasReais: [15000, 18000, 22000, 19000, 25000, 28000],
            previsao: [null, null, null, 21000, 24000, 27000]
        };
    }

    getMockTendencias() {
        return [
            {
                tipo: 'crescimento',
                titulo: 'Crescimento de Vendas',
                descricao: 'Tendência de crescimento nas vendas do setor de eletrônicos',
                impacto: 15,
                confianca: 85
            },
            {
                tipo: 'sazonalidade',
                titulo: 'Sazonalidade Detecteda',
                descricao: 'Pico de vendas previsto para o próximo trimestre',
                impacto: 25,
                confianca: 90
            },
            {
                tipo: 'comportamento',
                titulo: 'Mudança no Comportamento',
                descricao: 'Aumento na preferência por produtos premium',
                impacto: 10,
                confianca: 75
            }
        ];
    }

    getMockRecomendacoesEstoque() {
        return [
            {
                id: '1',
                produto: 'Smartphone XYZ',
                descricao: 'Estoque abaixo do nível recomendado',
                estoqueAtual: 15,
                estoqueRecomendado: 30,
                prioridade: 'alta'
            },
            {
                id: '2',
                produto: 'Notebook ABC',
                descricao: 'Estoque próximo do ponto de reordem',
                estoqueAtual: 25,
                estoqueRecomendado: 40,
                prioridade: 'media'
            }
        ];
    }

    getMockOtimizacaoPrecos() {
        return [
            {
                id: '1',
                produto: 'Smartphone XYZ',
                precoAtual: 1999.99,
                precoRecomendado: 1899.99,
                variacao: -5,
                elasticidade: -1.2,
                margemAtual: 25,
                margemProjetada: 23
            },
            {
                id: '2',
                produto: 'Notebook ABC',
                precoAtual: 4999.99,
                precoRecomendado: 5299.99,
                variacao: 6,
                elasticidade: -0.8,
                margemAtual: 30,
                margemProjetada: 32
            }
        ];
    }

    clearCache() {
        this.cache.clear();
    }
}

export const dashboardData = new DashboardData(); 