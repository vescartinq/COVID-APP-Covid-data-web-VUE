const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  name: { type: String, required: [true, 'Mandatory name'] },
  description: String,
  userId: String,
  date: { type: Date, default: Date.now },
  active: { type: Boolean, default: true },
});

// Convertir a un modelo
const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
