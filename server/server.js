const express = require('express');
const bodyParser  = require('body-parser');
const mongoose  = require('mongoose');
require('./config/config');

const app = express();

// Config
app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json())

// routes
app.use( require('./routes/routes') );

// db connection
mongoose.connect( process.env.urlDB, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
})
.then(db => console.log("db is connected"))
.catch(err => console.log(err));


app.listen(process.env.PORT, ()=>{
	console.log( `server en el puerto ${process.env.PORT}`);
});

