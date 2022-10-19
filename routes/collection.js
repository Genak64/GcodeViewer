var fs = require('fs');
var express = require('express');
var router = express.Router();

const library = require('js-svg-path');

var sp = require('../js/svgToShape.js');

/* GET collection page. */
router.get('/', function(req, res, next) {
	
	//sp.svgpr();
	
	
	fs.readdir('./collection/',(err,files)=>{
		if (err) throw err;
//		console.log(files);
	
		var listFiles = [];
		var listNames = [];
		
		var fileInfo;
		
		for (var i=0; i<files.length; i+=2){
			fileInfo = JSON.parse(fs.readFileSync('./collection/'+files[i+1], 'utf8'));
			listNames.push(fileInfo.originalname);
			listFiles.push(files[i]);
		}
//		console.log(listFiles);
		res.render('collection', { title: 'G-code viewer',itemsVisible: true, items: listNames, files: listFiles });
	});

});


/* Add item to collection */
router.get('/add', function(req,res,next){
	var fname = req.query.fname;
	
//	console.log("rout add: "+fname);


	fs.rename('./uploads/'+fname, './collection/'+fname, (err)=>{
		if (err) throw err;
//		console.log('source.txt was copied to destination.txt');
	}); 
	
	fs.rename('./uploads/'+fname+'.JSON', './collection/'+fname+'.JSON', (err)=>{
		if (err) throw err;
//		console.log('source.txt was copied to destination.txt');
	});
	/*
	fs.rm('./uploads/', (err)=>{
		if (err) throw err;
		console.log('delete all');
	});
	*/
	
	res.sendStatus(200);
});

/* download item from collection */
router.get('/download', function(req,res,next){
	var name = req.query.name;
	
//	console.log("rout download: "+name);
	
	fs.readFile('./collection/'+name, 'utf8',(err,data)=>{
		
	
	res.send(data);
	});
});


module.exports = router;
