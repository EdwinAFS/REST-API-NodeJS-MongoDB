
process.env.PORT = process.env.PORT || 3000;

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let urlDB;

if( process.env.NODE_ENV === 'dev'){
	urlDB = "mongodb://localhost/cafe"
}else{
	urlDB = process.env.MONGO_URI
}

// expre token
process.env.TOKEN_EXPIRATION = '1h';

// seed autentication
process.env.SEED = process.env.SEED || 'mi-secret-dev';

process.env.urlDB = urlDB;