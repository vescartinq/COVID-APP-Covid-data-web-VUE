const express = require('express');
const router = express.Router();

// importar el modelo nota
const Note = require('../models/note');

// Agregar una nota
router.post('/new-note', async (req, res) => {
  const body = req.body;
  try {
    const noteDB = await Note.create(body);
    res.status(200).json(noteDB);
  } catch (error) {
    return res.status(500).json({
      message: 'Error',
      error,
    });
  }
});

// Get con parámetros
router.get('/note/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const noteDB = await Note.findOne({ _id });
    res.json(noteDB);
  } catch (error) {
    return res.status(400).json({
      message: 'Error',
      error,
    });
  }
});

// Get con todos los documentos
router.get('/note', async (req, res) => {
  try {
    const noteDb = await Note.find();
    res.json(noteDb);
  } catch (error) {
    return res.status(400).json({
      message: 'Error',
      error,
    });
  }
});

// Delete eliminar una nota
router.delete('/note/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const noteDb = await Note.findByIdAndDelete({ _id });
    if (!noteDb) {
      return res.status(400).json({
        message: 'Id not found',
        error,
      });
    }
    res.json(noteDb);
  } catch (error) {
    return res.status(400).json({
      message: 'Error',
      error,
    });
  }
});

// Put actualizar una nota
router.put('/note/:id', async (req, res) => {
  const _id = req.params.id;
  const body = req.body;
  try {
    const noteDb = await Note.findByIdAndUpdate(_id, body, { new: true });
    res.json(noteDb);
  } catch (error) {
    return res.status(400).json({
      message: 'Error',
      error,
    });
  }
});

// Exportación de router
module.exports = router;
