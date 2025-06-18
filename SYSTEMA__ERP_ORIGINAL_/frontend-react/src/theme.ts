import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0d6efd',
      light: '#3d8bfd',
      dark: '#0a58ca',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#6c757d',
      light: '#868e96',
      dark: '#495057',
      contrastText: '#ffffff',
    },
    success: {
      main: '#198754',
      light: '#2ea043',
      dark: '#146c43',
      contrastText: '#ffffff',
    },
    error: {
      main: '#dc3545',
      light: '#e4606d',
      dark: '#b02a37',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#ffc107',
      light: '#ffca2c',
      dark: '#cc9a06',
      contrastText: '#000000',
    },
    info: {
      main: '#0dcaf0',
      light: '#3dd5f3',
      dark: '#0aa2c0',
      contrastText: '#000000',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.43,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
          borderRadius: 12,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
}); 