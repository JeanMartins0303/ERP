import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const Perfil: React.FC = () => {
  return (
    <Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
        <img
          src={require('../../../img/logo_login_principal.png')}
          alt="Logo COREL SYS"
          style={{ height: 60, width: 'auto', marginBottom: 8 }}
        />
        <Typography variant="h4" fontWeight={700} mb={2} color="primary" align="center">
          Perfil
        </Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card sx={{ boxShadow: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" fontWeight={600}>
                  Informações do Perfil
                </Typography>
                <Button variant="contained" color="primary" startIcon={<AddIcon />}>
                  Editar Perfil
                </Button>
              </Box>
              <Typography variant="body1" color="text.secondary">
                Nenhuma informação disponível.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Perfil; 