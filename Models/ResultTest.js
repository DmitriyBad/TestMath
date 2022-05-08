const {Schema, model} = require('mongoose');

const answerSchema = new Schema({
  question:{type: String, required: true},
  answer:{type: Number, required: true},
  result:{type: Boolean, required: true},
  numberTest:{type: Number, required: true},
  DateTest:{type: Date, default: Date.now},
  user_id:{type: String, required: true}
  //user_id:{type: String, required: true}
});

module.exports = model('answers', answerSchema);