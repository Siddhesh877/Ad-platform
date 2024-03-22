const express = require('express');
const app = express();
const connectDB = require('./config/db');
const viewerRouts = require('./routes/viewerRoutes');
const businessRouts = require('./routes/businessRoutes');
connectDB();
const port = 5501 || process.env.PORT;
app.use(express.json());
app.use('/api/viewer', viewerRouts);
app.use('/api/business', businessRouts);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});