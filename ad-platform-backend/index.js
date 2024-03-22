const express = require('express');
const app = express();
const connectDB = require('./config/db');
connectDB();
app.use(express.json());
const port = 5501;




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});