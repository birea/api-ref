const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require("dotenv").config();

const routes = require('./routes')

// DB connection
const MONGODB_URL = process.env.MONGODB_URL;
mongoose.connect(MONGODB_URL, { 
	useNewUrlParser: true, 
	useUnifiedTopology: true 
}).then(() => {
	//don't show the log when it is test
	if(process.env.NODE_ENV !== "test") {
		console.log("Connected to %s", MONGODB_URL);
	}
})
	.catch(err => {
		console.error("MongoDB connection starting error:", err.message);
		process.exit(1);
	});

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))

//To allow cross-origin requests
app.use(cors());

//Route Prefixes
app.use('/api', routes);

app.listen(4000);