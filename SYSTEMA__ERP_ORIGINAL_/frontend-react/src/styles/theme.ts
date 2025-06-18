import { createTheme } from '@mui/material/styles';

const purpleNeon = '#b100ff';
const darkBg = '#181a1b';
const lightBg = '#f5f5f5';
const white = '#fff';
const textDark = '#181a1b';
const textLight = '#fff';

export const getTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: purpleNeon,
        contrastText: white,
      },
      secondary: {
        main: '#6c2cff',
        contrastText: white,
      },
      background: {
        default: mode === 'dark' ? darkBg : lightBg,
        paper: mode === 'dark' ? '#23272f' : white,
      },
      text: {
        primary: mode === 'dark' ? textLight : textDark,
        secondary: mode === 'dark' ? '#bdbdbd' : '#333',
      },
    },
    typography: {
      fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: { fontWeight: 700 },
      h2: { fontWeight: 600 },
      h3: { fontWeight: 500 },
      h4: { fontWeight: 500 },
      h5: { fontWeight: 500 },
      h6: { fontWeight: 500 },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 8,
            fontWeight: 600,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: '0 4px 24px 0 rgba(177,0,255,0.10)',
          },
        },
      },
    },
  });

export default getTheme('light'); 