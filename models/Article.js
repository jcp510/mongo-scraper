var mongoose = require('mongoose');

// Define model through Schema interface.
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    // note object stores a Note id, ref property links ObjectId to Note model, allowing for Note-Article 
    // association.
    note:
    {
        type: Schema.Types.ObjectId
        ref: 'Note'
    }
});

// Create model from ArticleSchema.
var Article = mongoose.model('Article', ArticleSchema);

// Export Article model.
module.exports = Article;