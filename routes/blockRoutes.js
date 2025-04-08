const express = require('express');
const router = express.Router();
const {
  getAllBlocks,
  getBlockById,
  searchBlocks,
} = require('../controllers/blockController');

// GET /api/blocks?page=1&limit=10
router.get('/', getAllBlocks);

// GET /api/blocks/:id
router.get('/:id', getBlockById);

// GET /api/blocks/search?name=Door&type=block
router.get('/search/filter', searchBlocks);

module.exports = router;
