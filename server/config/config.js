
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

process.env.GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "653298296012-s9ga2hun69bl8b08gv3sedomcc4ristt.apps.googleusercontent.com";