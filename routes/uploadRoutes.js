const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { uploadFileAndParse } = require('../controllers/uploadController');

// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext === '.dxf') cb(null, true);
    else cb(new Error('Only .dxf files are allowed'));
  }
});

router.post('/', upload.single('file'), uploadFileAndParse);

module.exports = router;
