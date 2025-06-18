import React from 'react';
import { Grid, Typography, Box, Card, CardContent } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const cardData = [
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

const Dashboard: React.FC = () => {
  return (
    <Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
        <img
          src={require('../../../img/logo_login_principal.png')}
          alt="Logo COREL SYS"
          style={{ height: 60, width: 'auto', marginBottom: 8 }}
        />
        <Typography variant="h4" fontWeight={700} mb={2} color="primary" align="center">
          Dashboard
        </Typography>
      </Box>
      <Grid container spacing={3} mb={4}>
        {cardData.map((card) => (
          <Grid item xs={12} sm={6} md={3} key={card.title}>
            <Card sx={{
              background: (theme) => theme.palette.background.paper,
              boxShadow: 3,
              borderLeft: (theme) => `6px solid ${theme.palette.primary.main}`,
              minHeight: 120,
              display: 'flex',
              alignItems: 'center',
            }}>
              <CardContent sx={{ width: '100%', display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box>{card.icon}</Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    {card.title}
                  </Typography>
                  <Typography variant="h5" fontWeight={600} color="text.primary">
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
          <Card sx={{ minHeight: 340, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} mb={2}>
                Gráfico de Vendas (Exemplo)
              </Typography>
              {/* Aqui pode ser integrado um gráfico real futuramente */}
              <Box sx={{ height: 240, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'primary.main', fontSize: 24, opacity: 0.3 }}>
                [Gráfico de vendas]
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ minHeight: 340, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} mb={2}>
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