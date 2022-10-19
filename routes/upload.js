var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer  = require("multer");

const path = require('path');

const upload = multer({dest:"uploads"});

var sp = require('../js/gcodeToShape.js');
 

router.post("/upload", upload.single("filedata"), function (req, res, next) {
   
    let filedata = req.file;
 
//  console.log(filedata);
//	console.log(filedata.filename);
	
	
	
	
    if(!filedata){
//	res.sendStatus(500);
	res.send("Ошибка при загрузке файла");
	}
    else {
//		res.send("Файл загружен");


	var data;
	fs.readFile('uploads/'+filedata.filename, 'utf8', (err, data) => {
	  if (err) throw err;
	  
	var gcode=data.split('\r\n');
	var shape=sp.getShape(gcode);
		shape[0].fname=filedata.filename;
	  res.send(JSON.stringify(shape));
	});
	
	
	fs.appendFile('uploads/'+filedata.filename+'.JSON', JSON.stringify(filedata), 'utf8',(err) => {
		if (err) throw err;
//		console.log('The "filedata" was appended to file!');
	});
	
	}
	

});



module.exports = router;
