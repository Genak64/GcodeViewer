const parser = require('../js/ParserGcodeCadr.js');
const border = require('../js/updateBorderShape.js');

	var minX=0;
	var minY=0;
	var maxX=0;
	var maxY=0;
	

//Converting g-code and getting shape 
//	items - string array	

module.exports.getShape = function (items){

	var shape=[];
	var path={
		points:[]
	};
	var point={};
	var currentPoint={};
	var pathCreated=false;
	var RedyToAddPoint=false;
	
	currentPoint.x=0;
	currentPoint.y=0;
	
	
	for(i=0; i<items.length;i++){
		if (items[i].indexOf("M5")!=-1&&!pathCreated){
			
			continue;
		}
		if (items[i].indexOf("M5")!=-1&&pathCreated){
			shape.push(path);
			pathCreated=false;
			continue;
		}
		if (items[i].indexOf("G0")!=-1&&!pathCreated){
			pathCreated=true;
			path={
				points:[]
			};
			point = {};
			point=parser.parseXY(items[i]);
			path.points.push(point);
			currentPoint=point;
			continue;
		}
		if ((items[i].indexOf("M4")!=-1||items[i].indexOf("M3")!=-1)&&pathCreated){
			RedyToAddPoint=true;
			path.power=parser.parseS(items[i]);
			continue;
		}
		if (items[i].indexOf("G1")!=-1&&pathCreated){
			path.speed=parser.parseF(items[i]);
			
			if (items[i].indexOf("X")!=-1&&items[i].indexOf("Y")!=-1&&RedyToAddPoint){
				point=parser.parseXY(items[i]);
				path.points.push(point);
				currentPoint=point;
			} else {
				if (items[i].indexOf("X")!=-1) {
					point = {};
					point.x=parseFloat(parser.parseX(items[i]));
					point.y=parseFloat(currentPoint.y);
					path.points.push(point);
					currentPoint=point;
					continue
				} 
				if (items[i].indexOf("Y")!=-1) {
					point = {};
					point.y=parseFloat(parser.parseY(items[i]));
					point.x=parseFloat(currentPoint.x);
					path.points.push(point);
					currentPoint=point;
					continue
				}
			}
			continue;
		}
		if (items[i].indexOf("X")!=-1&&items[i].indexOf("Y")!=-1&&RedyToAddPoint){
			point = {};
			point=parser.parseXY(items[i]);
			path.points.push(point);
			currentPoint=point;
		} else {
			if (items[i].indexOf("X")!=-1) {
				point = {};
				point.x=parseFloat(parser.parseX(items[i]));
				point.y=parseFloat(currentPoint.y);
				path.points.push(point);
				currentPoint=point;
				continue
			} 
			if (items[i].indexOf("Y")!=-1) {
				point = {};
				point.x=parseFloat(currentPoint.x);
				point.y=parseFloat(parser.parseY(items[i]));
				path.points.push(point);
				currentPoint=point;
				continue
			}
			
		}
	
	}
	
	return border.updateBorderShape(shape);
}
