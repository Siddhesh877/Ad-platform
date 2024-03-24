import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Registration from './components/shared/Registration';
import Login from './components/shared/Login';
import BusinessPage from './pages/BusinessPage';
import ViewerPage from './pages/ViewerPage';
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/registration" element={<Registration/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/business" element={<BusinessPage/>}></Route>
        <Route path="/viewer" element={<ViewerPage/>}></Route>
      </Routes>
    </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
