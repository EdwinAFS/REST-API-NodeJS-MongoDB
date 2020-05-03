const express = require('express');
const bodyParser  = require('body-parser');
const mongoose  = require('mongoose');
const path  = require('path');
require('./config/config');

const app = express();

// Config
app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json())
app.set('port', process.env.PORT || 3000);

// statics configuration
app.use( express.static( path.resolve( __dirname, '../public') ) );

// routes
app.use( require('./routes/routes') );

// db connection
mongoose.connect(process.env.urlDB , {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
})
.then(db => console.log("db is connected"))
.catch(err => console.log(err));


app.listen(app.get('port'), ()=>{
	console.log( `server en el puerto ${app.get('port') }`);
});

