import React from 'react';
import { Grid, Typography, Box, Card, CardContent, CircularProgress } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import logo from '../../../img/logo_login_principal.png';

interface CardData {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}

interface ChartData {
  name: string;
  vendas: number;
  pedidos: number;
}

const cardData: CardData[] = [
  {
    title: 'Vendas',
    value: 'R$ 12.500',
    icon: <TrendingUpIcon fontSize="large" color="primary" />,
    color: 'primary.main',
  },
  {
    title: 'Pedidos',
    value: '320',
    icon: <ShoppingCartIcon fontSize="large" color="secondary" />,
    color: 'secondary.main',
  },
  {
    title: 'Clientes',
    value: '1.200',
    icon: <PeopleIcon fontSize="large" sx={{ color: '#b100ff' }} />,
    color: 'primary.main',
  },
  {
    title: 'Receita',
    value: 'R$ 8.900',
    icon: <AttachMoneyIcon fontSize="large" sx={{ color: '#6c2cff' }} />,
    color: 'secondary.main',
  },
];

// Dados de exemplo para o gráfico
const data: ChartData[] = [
  { name: 'Jan', vendas: 4000, pedidos: 2400 },
  { name: 'Fev', vendas: 3000, pedidos: 1398 },
  { name: 'Mar', vendas: 2000, pedidos: 9800 },
  { name: 'Abr', vendas: 2780, pedidos: 3908 },
  { name: 'Mai', vendas: 1890, pedidos: 4800 },
  { name: 'Jun', vendas: 2390, pedidos: 3800 },
];

const Dashboard: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Simulando carregamento de dados
  React.useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        // Aqui você faria a chamada para a API
        // const response = await api.getDashboardData();
        // setData(response.data);
      } catch (err) {
        setError('Erro ao carregar dados do dashboard');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
        <img
          src="/img/logo_login_principal.png"
          alt="Logo COREL SYS"
          style={{ height: 60, width: 'auto', marginBottom: 8 }}
          onError={(e) => {
            e.currentTarget.src = 'fallback-logo.png';
          }}
        />
        <Typography 
          variant="h4" 
          fontWeight={700} 
          mb={2} 
          color="primary" 
          align="center" 
          sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' } }}
          role="heading"
          aria-level={1}
        >
          Dashboard
        </Typography>
      </Box>
      <Grid container spacing={3} mb={4}>
        {cardData.map((card) => (
          <Grid item xs={12} sm={6} md={3} key={card.title}>
            <Card
              sx={{
                background: (theme) => theme.palette.background.paper,
                boxShadow: 3,
                borderLeft: (theme) => `6px solid ${theme.palette.primary.main}`,
                minHeight: 120,
                display: 'flex',
                alignItems: 'center',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 6,
                },
              }}
              role="region"
              aria-label={`Card de ${card.title}`}
            >
              <CardContent sx={{ width: '100%', display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box>{card.icon}</Box>
                <Box>
                  <Typography 
                    variant="subtitle2" 
                    color="text.secondary" 
                    sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' } }}
                  >
                    {card.title}
                  </Typography>
                  <Typography 
                    variant="h5" 
                    fontWeight={600} 
                    color="text.primary" 
                    sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.8rem' } }}
                  >
                    {card.value}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card 
            sx={{ 
              minHeight: 340, 
              boxShadow: 3, 
              transition: 'box-shadow 0.3s ease', 
              '&:hover': { boxShadow: 6 } 
            }}
            role="region"
            aria-label="Gráfico de Vendas e Pedidos"
          >
            <CardContent>
              <Typography 
                variant="h6" 
                fontWeight={600} 
                mb={2} 
                sx={{ fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' } }}
              >
                Gráfico de Vendas e Pedidos
              </Typography>
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis /> 
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="vendas" 
                    stroke="#8884d8" 
                    activeDot={{ r: 8 }} 
                    name="Vendas"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="pedidos" 
                    stroke="#82ca9d" 
                    name="Pedidos"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card 
            sx={{ 
              minHeight: 340, 
              boxShadow: 3, 
              transition: 'box-shadow 0.3s ease', 
              '&:hover': { boxShadow: 6 } 
            }}
            role="region"
            aria-label="Alertas e Notificações"
          >
            <CardContent>
              <Typography 
                variant="h6" 
                fontWeight={600} 
                mb={2} 
                sx={{ fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' } }}
              >
                Alertas & Notificações
              </Typography>
              <Box sx={{ color: 'secondary.main', fontWeight: 500 }}>
                Nenhum alerta no momento.
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 