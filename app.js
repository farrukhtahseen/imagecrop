const express = require('express');
const app = express();
const upload = require('./routes/upload');
const path = require('path');


app.use(express.json());
app.use(express.urlencoded({extended:true}));
    
   
app.get('/', (req, res) => {
      res.sendFile(__dirname + '/index.html');
    });
// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.use('/upload',upload);

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
