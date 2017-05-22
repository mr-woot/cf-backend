const mongoose = require('mongoose'),
  Schema = mongoose.Schema;
  // autoIncrement = require('mongoose-auto-increment');

// autoIncrement.initialize(mongoose.Connection);

let TrackSchema = new Schema({
  query: {type: String, required: true, minlength: 1, trim: true},
  savedAt: {type: Number, default: new Date().getTime()}
});

const Track = mongoose.model('Track', TrackSchema);

// TrackSchema.plugin(autoIncrement.plugin, { model: 'Track', field: 'queryId' });

module.exports = {
  Track
};
