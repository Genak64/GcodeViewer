
//console.log(gcodeToShape.getShape(gcodeFile));


/*
var doc=document.querySelector('canvas');

doc.onclick=function(){

	var gFile="";
	
	var url = '/canvas';
	var request = new XMLHttpRequest();
	
		request.open('GET', url);
		request.responseType = 'text';
		
		request.onload = function() {
			gFile = request.response;
			
var gcode=gFile.split('\r\n');
			
			
//			var sh=gcodeToShape.getShape(gcodeFile);

			var orig=gcodeToShape.getShape(gcode);


			oksp=transformShape.dublicate(orig,8,7,10);
			drawing.setView(1000,800);
			drawing.paint(oksp,'canv');
			console.log(gcode);

			var p=new gParser();
			console.log(p);
			console.log(p.cadresToShape(gcodeFile));
			console.log(gParser.createGcode(orig));
			
		};
		
		request.send();

	
};
*/

function canvasDisplay(){
	
	var gFile="";
	
	var url = '/canvas';
	var request = new XMLHttpRequest();
	
		request.open('GET', url);
		request.responseType = 'text';
		
		request.onload = function() {
			gFile = request.response;
			
//	var gcode=gFile.split('\r\n');
			
			
//			var orig=gcodeToShape.getShape(gcode);
			console.log(gFile);
		var orig=JSON.parse(gFile);
			console.log(updateBorderShape(orig));
			oksp=transformShape.dublicate(orig,2,2,10);
			drawing.setView(1000,800);
			drawing.paint(oksp,'canv');
//			console.log(gcode);

//			var p=new gParser();
//			console.log(p);
			//console.log(p.cadresToShape(gcode));
//			console.log(gParser.createGcode(orig));
			
		};
		
		request.send();
}

function updateBorderShape(shape){
			var minX=0;
			var minY=0;
			var maxX=0;
			var maxY=0;

		for(path in shape){
		
			if (Number.isInteger(parseInt(path))) {

				for(points in path){
					for (p in shape[path].points){
						
						minX=minX>shape[path].points[p].x?shape[path].points[p].x:minX;
						minY=minY>shape[path].points[p].y?shape[path].points[p].y:minY;
						maxX=maxX<shape[path].points[p].x?shape[path].points[p].x:maxX;
						maxY=maxY<shape[path].points[p].y?shape[path].points[p].y:maxY;
					}
				}
			}
		}
		shape.minX=minX;
		shape.minY=minY;
		shape.maxX=maxX;
		shape.maxY=maxY;
		shape.height=Math.abs(maxY)-Math.abs(minY);
		shape.width=Math.abs(maxX)-Math.abs(minX);

		return shape;
	}