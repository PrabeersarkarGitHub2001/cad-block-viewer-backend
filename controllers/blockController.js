const db = require('../models');
const { Op } = require('sequelize');

// GET /api/blocks?page=1&limit=10
// GET /api/blocks?page=1&limit=10&search=abc
const getAllBlocks = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const search = req.query.search || '';
  
      const where = search
        ? {
            name: {
              [Op.iLike]: `%${search}%`
            }
          }
        : {};
  
      const { count, rows } = await db.Block.findAndCountAll({
        where,
        limit,
        offset,
        order: [['createdAt', 'DESC']],
      });
  
      res.status(200).json({
        total: count,
        page,
        totalPages: Math.ceil(count / limit),
        blocks: rows,
      });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to fetch blocks' });
    }
  };
  
// GET /api/blocks/:id
const getBlockById = async (req, res) => {
  try {
    const id = req.params.id;
    const block = await db.Block.findByPk(id);

    if (!block) {
      return res.status(404).json({ message: 'Block not found' });
    }

    res.status(200).json(block);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch block details' });
  }
};

// GET /api/blocks/search/filter?name=abc&type=xyz
const searchBlocks = async (req, res) => {
  try {
    const { name, type } = req.query;

    const filters = {};
    if (name) filters.name = { [Op.iLike]: `%${name}%` };
    if (type) filters['properties.type'] = { [Op.iLike]: `%${type}%` }; // assuming "type" is inside properties JSON

    const blocks = await db.Block.findAll({ where: filters });

    res.status(200).json(blocks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error searching blocks' });
  }
};

module.exports = {
  getAllBlocks,
  getBlockById,
  searchBlocks,
};
