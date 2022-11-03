const express = require('express'),
  app = express(),
  cors = require('cors'),
  dotenv = require('dotenv');
dotenv.config();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome' });
});

require('./src/routes/movieRoutes.js')(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
