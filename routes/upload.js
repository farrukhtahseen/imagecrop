const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');


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
      
    }
  });
});

module.exports = router;
