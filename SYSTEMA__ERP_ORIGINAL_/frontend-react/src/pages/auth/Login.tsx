import React from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  Alert,
} from '@mui/material';
import { login } from '../../store/slices/authSlice';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Digite um e-mail válido')
    .required('E-mail é obrigatório'),
  password: yup
    .string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .required('Senha é obrigatória'),
});

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = React.useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await dispatch(login(values));
        navigate('/');
      } catch (err) {
        setError('E-mail ou senha inválidos');
      }
    },
  });

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Typography component="h1" variant="h5" align="center">
        Login
      </Typography>

      {error && (
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <TextField
        fullWidth
        id="email"
        name="email"
        label="E-mail"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />

      <TextField
        fullWidth
        id="password"
        name="password"
        label="Senha"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        disabled={formik.isSubmitting}
      >
        Entrar
      </Button>

      <Box sx={{ textAlign: 'center' }}>
        <Link component={RouterLink} to="/register" variant="body2">
          Não tem uma conta? Cadastre-se
        </Link>
      </Box>
    </Box>
  );
};

export default Login; 