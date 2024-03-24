const express = require('express');
const app = express();
const connectDB = require('./config/db');
const viewerRouts = require('./routes/viewerRoutes');
const businessRouts = require('./routes/businessRoutes');
const cors = require('cors');
connectDB();
const port = 5501 || process.env.PORT;
// use cors to allow cross origin resource sharing

const allowedOrigins = ['http://localhost:3000'];
console.log(allowedOrigins);
app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));
app.use(express.json());
app.use('/api/viewer', viewerRouts);
app.use('/api/business', businessRouts);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});