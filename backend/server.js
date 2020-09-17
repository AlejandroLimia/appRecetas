const express = require('express');
require('dotenv').config();
require('./config/db');
const cors = require('cors');
const router = require('./routes');
const fileUpload = require('express-fileupload')
const app = express();
const path = require('path')

//Middlewares
app.use(express.json())
app.use(cors())
app.use(fileUpload())

app.use(express.static('client/img'))
// Routes
app.use("/api", router);
if(process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'))
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname+'/client/build/index.html'))
	})
}

// Server
const port = process.env.PORT || 4000;
const host = process.env.HOST || '0.0.0.0';

app.listen(port, host, () => {
	console.log(`Listening on port ${port}`);
})