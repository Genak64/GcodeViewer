const fs = require('fs');
const library = require('js-svg-path');
const parseSvg  = require('svg-parser');

//const outlin=new library.Outline();
/*
var d='M3,7 5-6 L1,7 1e2-.4 m-10,10 l10,0  \
  V27 89 H23           v10 h10             \
  C33,43 38,47 43,47   c0,5 5,10 10,10     \
  S63,67 63,67         s-10,10 10,10       \
  Q50,50 73,57         q20,-5 0,-10        \
  T70,40               t0,-15              \
  A5,5 45 1,0 40,20    a5,5 20 0,1 -10-10  Z';

console.log(library(d));

	*/


function svgFileRead(){
	
	var	outlin=new library.Outline();
	const parser = new library.SVGParser(outlin);
	
	var svgfile=[];
	var data;
	fs.readFile('public/files/part2.svg', 'utf8', (err, data) => {
	  if (err) throw err;
	//	svgfile=data.split('\r\n');
		
		var parsed=parseSvg.parse(data);
		
		var svgPathes;
	//	console.log(parsed.children[0].children);
		
		for (gTag in parsed.children[0].children){
//			console.log(parsed.children[0].children[gTag].tagName);
			if (parsed.children[0].children[gTag].tagName=="g"||parsed.children[0].children[gTag].tagName=="G"){
//				console.log(parsed.children[0].children[gTag]);
				svgPathes=parsed.children[0].children[gTag];
			}
			
		}
		
		for (p in svgPathes.children){
		//	console.log(svgPathes.children[p].tagName);
		//	console.log(svgPathes.children[p].properties.d);
			if (svgPathes.children[p].tagName=="path"){
				
				parser.parse(svgPathes.children[p].properties.d);
				if (parser.receiver.current==null) {
				console.log(parser.receiver.curveshapes[0].points);
				}
				
				if (parser.receiver.current!=null) {
				console.log(parser.receiver.current.points);
				}
			} 
			
		}
		
	//	parser.parse(svgPathes.children[0].properties.d);
//		console.log(parser.receiver);
//		console.log(outlin.current.points);
	
	
//	console.log(outlin);
//	var s=library.parse('M3,7 5-6 L1,7 1e2-.4 m-10,10 l10,0  A5,5 45 1,0 40,20    a5,5 20 0,1 -10-10  Z');
//		getSvgPath(svgfile);
//		console.log(svgfile);
		
	});
	
}



function svgpr(){
	svgFileRead();
//	console.log(svgFileRead());
	
	
	
}


function getSvgPath(svgfile){
	
	var pathes=[];
	console.log(svgfile[0].length);
	for (index in svgfile){
		
		
		if (svgfile[index].indexOf("d=")||svgfile[index].indexOf("D=")){
			pathes.push(svgfile[index]);
		//	console.log(svgfile[index]);
		}
		
	}
	
}


module.exports={svgpr};