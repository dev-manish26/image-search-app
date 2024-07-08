import React from 'react';
import './App.css';
import { Container, Typography } from '@mui/material';
import ImageSearch from './components/ImageSearch';

function App() {
  return (
    <Container>
      <Typography variant="h3" component="h1" gutterBottom align='center'>
       Image Search
      </Typography>
      <ImageSearch />
    </Container>
  );
}

export default App;
