const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const taskScheme = new Schema({
    text: String,
    value: Number
});
module.exports = Task = mongoose.model("tasks", taskScheme);