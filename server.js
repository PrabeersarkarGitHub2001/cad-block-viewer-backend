const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
require('dotenv').config();

const uploadRoutes = require('./routes/uploadRoutes');
const blockRoutes = require('./routes/blockRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/upload', uploadRoutes);
app.use('/api/blocks', blockRoutes);
app.get('/', (req, res) => {
  res.send('I am workinh');
});
const PORT = process.env.PORT || 5000;
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT,'0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
});
