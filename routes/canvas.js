var express = require('express');
var router = express.Router();
var fs = require('fs');

var sp = require('../js/gcodeToShape.js');


/* GET canvas */
router.get('/', function(req, res, next) {

var data;
fs.readFile('public/files/part1.nc', 'utf8', (err, data) => {
  if (err) throw err;

	var gcode=data.split('\r\n');
	
//	var shape={};
	
//	shape=sp.getShape(gcode);
//	console.log(shape);
//	console.log(JSON.stringify(shape.getShape(gcode)));
//	var json=JSON.stringify(shape);
//	console.log(json);
  res.send(JSON.stringify(sp.getShape(gcode)));
  
  
});
	
	
	
	
  //res.render('canvas', { dataPlain: data });
  
  
  
});

module.exports = router;
