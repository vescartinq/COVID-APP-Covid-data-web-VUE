const express = require('express');
const router = express.Router();

// import Note Schema
const Note = require('../models/noteSchema');

// Add Note
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

// Get all Notes
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

// Get a Note with parameters
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

// Delete a Note
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
    res.json('Note deleted');
  } catch (error) {
    return res.status(400).json({
      message: 'Error',
      error,
    });
  }
});

// Update a Note
router.put('/note/:id', async (req, res) => {
  const _id = req.params.id;
  const body = req.body;
  try {
    const noteDb = await Note.findByIdAndUpdate(_id, body, { new: true }); //{ new: true } nos devuelve la nota actualizada
    res.json(noteDb);
  } catch (error) {
    return res.status(400).json({
      message: 'Error',
      error,
    });
  }
});

module.exports = router;
