require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

const bodyParser = require('body-parser');

//configuración globarl de rutas
app.use(require('./routes/index'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

// habilitar la carpeta public
app.use(express.static(path.resolve(__dirname, '../public')));

// conectarse a DB
async function conectarDB(){
	try{
		await mongoose.connect(process.env.URLDB, {
		useNewUrlParser: true,
		useUnifiedTopology: true
		});
		console.log('base de datos ONLINE');
	} catch(e){
		console.log('No se pudo conectar a base de datos');
		console.log(e);
	}
}

conectarDB();


app.listen(process.env.PORT, () => {
	console.log(' Escuchando puerto: ', process.env.PORT);
});