var mongoose = require('mongoose');

// Save reference to Schema constructor.
var Schema = mongoose.Schema;

// Use Schema constructor to create new NoteSchema object.
var NoteSchema = new Schema({
    title: String,
    body: String
});

// Create model with NoteSchema.
var Note = mongoose.model('Note', NoteSchema);

// Export Note model.
module.exports = Note;