import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import AppRoutes from './routes';
import { CustomThemeProvider } from './contexts/ThemeContext';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <CustomThemeProvider>
        <Router>
          <AppRoutes />
        </Router>
      </CustomThemeProvider>
    </Provider>
  );
};

export default App; 