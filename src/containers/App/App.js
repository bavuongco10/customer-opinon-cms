import React from 'react';
import { hot } from 'react-hot-loader/root';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';
import { Provider } from 'react-redux';

import store from '../../redux/store.redux';
import theme from '../../themes/paper.theme';
import RootRouter from '../Router/RootRouter.container';

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RootRouter />
    </ThemeProvider>
  </Provider>
);

export default process.env.NODE_ENV === 'development' ? hot(App) : App;
