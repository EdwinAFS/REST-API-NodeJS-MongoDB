
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let urlDB;

if( process.env.NODE_ENV === 'dev'){
	urlDB = "mongodb://localhost/cafe"
}else{
	urlDB = process.env.MONGO_URI
}

process.env.urlDB = urlDB;