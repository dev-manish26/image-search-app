const express = require('express');
const { createApi } = require('unsplash-js');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

let fetch;
try {
  fetch = require('node-fetch');
} catch (e) {
  if (e.code === 'ERR_REQUIRE_ESM') {
    // Use dynamic import for ES Modules
    fetch = import('node-fetch').then(module => module.default);
  } else {
    throw e;
  }
}

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
  fetch: fetch,
});

app.use(cors());

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.get('/api/photos', (req, res) => {
  const query = req.query.query;
  unsplash.search.getPhotos({ query, page: 1, perPage: 10 })
    .then(result => {
      if (result.errors) {
        res.status(500).json({ errors: result.errors });
      } else {
        res.json(result.response.results);
      }
    })
    .catch(err => {
      console.error('Error fetching photos:', err);
      res.status(500).json({ error: 'Failed to fetch photos' });
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
