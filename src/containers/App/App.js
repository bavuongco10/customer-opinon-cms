import React from 'react';
import { hot } from 'react-hot-loader/root';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { LocalizationProvider } from '@material-ui/pickers';
import DateFnsUtils from '@material-ui/pickers/adapter/date-fns';

import { persistor, store } from '../../redux/store.redux';
import theme from '../../themes/paper.theme';
import RootRouter from '../Router/RootRouter.container';

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PersistGate loading={null} persistor={persistor}>
        <LocalizationProvider dateAdapter={DateFnsUtils}>
          <RootRouter />
        </LocalizationProvider>
      </PersistGate>
    </ThemeProvider>
  </Provider>
);

export default process.env.NODE_ENV === 'development' ? hot(App) : App;
