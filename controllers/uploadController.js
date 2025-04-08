const fs = require('fs');
const DxfParser = require('dxf-parser');
const db = require('../models');

const uploadFileAndParse = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const filePath = req.file.path;
    const fileName = req.file.originalname;
    const uploadDate = new Date();

    const fileContents = fs.readFileSync(filePath, 'utf-8');
    const parser = new DxfParser();
    const dxfParsed = parser.parseSync(fileContents);

    const savedFile = await db.File.create({
      filename: fileName,
      uploadDate: uploadDate,
    });
 
    const blockInserts = [];

    // ✅ Parse top-level INSERTs for placement
    const inserts = dxfParsed.entities?.filter(e => e.type === 'INSERT') || [];

    for (const insert of inserts) {
      const name = insert.name || 'Unnamed';
      const pos = insert.position || { x: 0, y: 0 };

      blockInserts.push({
        fileId: savedFile.id,
        name,
        x: pos.x || 0,
        y: pos.y || 0,
        properties: insert,
      });
    }

    if (blockInserts.length > 0) {
      await db.Block.bulkCreate(blockInserts);
    }

    res.status(200).json({
      message: 'File uploaded and blocks saved successfully',
      blocksSaved: blockInserts.length,
    });

  } catch (error) {
    console.error('Error parsing/uploading file:', error);
    res.status(500).json({ error: 'Failed to upload and parse CAD file' });
  }
};

module.exports = { uploadFileAndParse };
