const express = require('express');
const sqlite3 = require('sqlite3');
var assert = require('assert');
var bodyParser = require('body-parser');
const app = express();



let db = new sqlite3.Database('./listaCompra.db', sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE, (err) => {
	console.log("Conexion a la BD con exito");
});

assert(db,"No se ha creado la conexion a la base de datos");


db.all("CREATE TABLE IF NOT EXISTS PendientesCompra (item TEXT NOT NULL PRIMARY KEY)", [], (err) => {
	console.log("Tabla encontrada");
});

/*

db.close((err) => {
	if(err){
		return console.error(err(message));
	}

	console.log("Conexion a la BD cerrada");
});

function consultaLista(){

}
*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//Consulta la lista de la compra
app.get('/listaCompra', function(req, res) {
	lista = "";
	db.all("select * from PendientesCompra", [], (err, rows) => {
		assert(!err, "Ocurrio un error al leer la BD");
		var lista = "";
		rows.forEach((row) => {
			lista += row.item+", ";
		});
		res.send(lista.slice(0,-2));

	});
});

module.exports.marcaGalletas = function añadeMarcaGalletas(){
	//return "Galletas Hacendado de las malas";
	return "Galletas Cuetara de las buenas";
}

//Añade un objeto a la lista de la compra
app.post('/nuevoItem', function(req, res) {
	assert(req.body.item, "No se ha incluido el item");
	var item = req.body.item;
	if(item === "galletas"){
		item = añadeMarcaGalletas();
		assert.equal(item, "Galletas Cuetara de las buenas", "Las galletas no son de las buenas");
	}
	db.all("insert into PendientesCompra (item) values('"+item+"')");
	res.send("Añadido correctamente");
});

//Borra la lista de la compra
app.post('/borraLista', function(req, res) {
	db.all("delete from PendientesCompra", [], (err) =>{
		if(err){
			throw err;
		}
		res.send("Lista eliminada");
	})
});

app.listen(3000, () => {
	console.log("Escuchando en el puerto 3000");
});
