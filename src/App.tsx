import './App.css';

import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Board from './components/Board';
import Boards from './components/Boards';
import ErrorPage from './components/ErrorPage';
import { FirebaseProvider } from './components/Firebase';
import Header from './components/Header';
import { firebaseConfig } from './constants';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const App: React.FC = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <FirebaseProvider config={firebaseConfig}>
          <Router>
            <Header />
            <Route exact path="/" component={Boards} />
            <Route exact path="/boards/:boardId" component={Board} />
            <Route exact path="/error" component={ErrorPage} />
          </Router>
        </FirebaseProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
