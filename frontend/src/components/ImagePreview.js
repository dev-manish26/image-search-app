import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const ImagePreview = ({ open, handleClose, image }) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>{image.alt_description}</DialogTitle>
      <DialogContent>
        <img src={image.urls.regular} alt={image.alt_description} style={{ maxWidth: '100%' }} />
        <Typography variant="body1">Downloads: {image.downloads}</Typography>
        <Typography variant="body1">Likes: {image.likes}</Typography>
        {/* Add more statistics as needed */}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImagePreview;
