const express = require('express');
const { createApi } = require('unsplash-js');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
  fetch: fetch,
});

app.use(cors());

app.get('/api/photos', (req, res) => {
  const query = req.query.query ;
  unsplash.search.getPhotos({ query, page: 1, perPage: 10 })
    .then(result => {
      if (result.errors) {
        res.status(500).json({ errors: result.errors });
      } else {
        res.json(result.response.results);
      }
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
