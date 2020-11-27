const express 		= require("express");
const morgan 		= require("morgan");
const path 			= require("path");
const mongoose 		= require("mongoose");

require("dotenv").config();

const app = express();

//body parser
app.use(express.json()); 

//importar rutas
const indexR = require("./routes/index.js");

// conección con la base de datos
mongoose.set("useFindAndModify", false);
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`, {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true
})
.then(db => console.log("DB Connected"))
.catch(err => console.log(err));

app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(morgan("dev"));
app.use(express.urlencoded({extended: false}));

//routes
app.use("/", indexR);

app.listen(app.get("port"), ()=> {
	console.log(`Server started on port ${app.get("port")}`);
})