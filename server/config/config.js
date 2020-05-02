
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


let urlDB;

if( process.env.NODE_ENV === 'dev'){
	urlDB = "mongodb://localhost/cafe"
}else{
	urlDB = "mongodb+srv://Edwin_AFS:12345Az!@cafedb-b5hvn.mongodb.net/cafe?retryWrites=true&w=majority"
}

process.env.urlDB = urlDB;