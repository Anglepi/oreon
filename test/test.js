var assert = require("assert");
var oreon = require("../oreon.js");


describe('Oreon',function(){
	describe('Carga', function(){
		it('Carga correctamente', function(){
			assert(oreon, "Cargado");
		});
	});

	describe('Añade las galletas buenas', function(){
		it('Añade galletas Cuetara', function(){
			var galletas = oreon.marcaGalletas();
			assert.equal(galletas, "Galletas Cuetara de las buenas", "Las galletas que añade son buenas");
		});
	});
});
