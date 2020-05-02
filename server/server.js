const express = require('express');
const bodyParser  = require('body-parser');
const mongoose  = require('mongoose');
require('./config/config');

const app = express();

// Config
app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json())
app.set('port', process.env.PORT || 3000);

// Route
app.get('/', (req, res) => {
	res.status(200).json({
		bienvenido: 'Bienvenido a la API Cafe',
		uri: process.env.MONGO_URI,
		entorno: process.env.NODE_ENV
	});
});

app.use( require('./routes/usuario') );

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

