import * as React from 'react';
import {RouterProvider} from 'react-router-dom';
import router from 'Routes';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
    palette: {
      mode: 'light',
    },
  });

const App = () => {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <RouterProvider router={router} />
        </ThemeProvider>

    );
};

export default App;
