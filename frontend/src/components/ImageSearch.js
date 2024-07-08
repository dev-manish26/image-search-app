// frontend/src/components/ImageSearch.js

import React, { useState, useEffect } from 'react';
import { Box, Grid, Card, CardMedia, CardContent, Typography, CircularProgress, TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ImagePreview from './ImagePreview';

const ImageSearch = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [firstLoad, setFirstLoad] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchPhotos = (searchQuery) => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/api/photos?query=${searchQuery}`)
      .then(response => {
        console.log('API Response:', response);
        return response.json();
      })
      .then(data => {
        console.log('API Data:', data);
        setPhotos(Array.isArray(data) ? data : []);
        setLoading(false);
        setFirstLoad(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPhotos(query);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchPhotos(query);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseImagePreview = () => {
    setSelectedImage(null);
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <form onSubmit={handleSearch}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search for images"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <IconButton type="submit" aria-label="search">
            <SearchIcon />
          </IconButton>
        </Box>
      </form>
      {!firstLoad && (
        loading ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={2}>
            {photos.map(photo => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={photo.id}>
                <Card onClick={() => handleImageClick(photo)} style={{ cursor: 'pointer' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={photo.urls.small}
                    alt={photo.alt_description}
                  />
                  <CardContent>
                    <Typography variant="body2" color="textSecondary">
                      {photo.alt_description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )
      )}
      {selectedImage && (
        <ImagePreview
          open={!!selectedImage}
          handleClose={handleCloseImagePreview}
          image={selectedImage}
        />
      )}
    </Box>
  );
};

export default ImageSearch;
