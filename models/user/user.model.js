(function () {
  var mongoose = require('mongoose');

  var Schema = mongoose.Schema;

  var UserSchema = new Schema({
    email: {
      type: String,
      required: true,
    },
    identification: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true
      // enum: ["admin","leader","st"],
    }
  });

  module.exports = mongoose.model('users', UserSchema);

})();
