const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
	user: String,
	psw: String
	// para crear valores por defecto se coloca un nuevo objeto dentro de ese objeto se le asigna el tipo y se coloca "default:"
});

module.exports = mongoose.model("users", User);