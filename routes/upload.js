const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const {pool} = require('../config/connect');

const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image file provided' });
  }
  //return console.log(req.file);
  const fileName = req.file.originalname;
  //return console.log(fileName);
  const fileContent = fs.readFileSync(req.file.path);
  

  const uploadPath = './uploads/' + fileName;
  fs.writeFile(uploadPath, fileContent, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Could not upload' });
    } else {
      console.log('File saved successfully');
      //saving upload path to db
      const query = 'INSERT INTO fileinfo (filename, path) VALUES (?, ?)';
      const values = [fileName, uploadPath];
  return new Promise((resolve,reject)=>{
    pool.query(query, values, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
      //console.log('File saved to database',result);
      res.json('file uploaded and path saved to db');
    });
  });
      
    }
  });
});

module.exports = router;
