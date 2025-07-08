const mongoose = require("mongoose");

const paperSetterSchema = new mongoose.Schema({
  teacher: String,
  subject: String,
  class: String,
  examType: String,
  dueDate: String,
});

module.exports = mongoose.model("PaperSetter", paperSetterSchema);
