const parser = require('../js/ParserGcodeCadr.js');
const border = require('../js/updateBorderShape.js');
const startEnd = require('../js/updateStartEndPointShape.js');
const pathLen = require('../js/addPathLength.js');
const idleFeed = require('../js/IdleFeedShape.js');

	var minX=1;
	var minY=1;
	var maxX=1;
	var maxY=1;

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
	var ReadyToAddPoint=false;
	
	currentPoint.x=0;
	currentPoint.y=0;
	
	for(i=0; i<items.length;i++){
		
		if (items[i].toUpperCase().indexOf("M5")!=-1/*&&pathCreated*/){
			/*
			shape.push(path);
			pathCreated=false;
			*/
			
			if (pathCreated){
				shape.push(path);
				pathCreated=false;
			}
			
			continue;
		}
	
		
		if (items[i].toUpperCase().indexOf("G0")!=-1/*&&!pathCreated*/){
			pathCreated=true;
			path={
				points:[]
			};
		
			path.points.push(parser.getPointToCadrXandY(items[i],currentPoint));
			currentPoint=parser.getPointToCadrXandY(items[i],currentPoint);
			continue;
		}
		if ((items[i].toUpperCase().indexOf("M4")!=-1||items[i].toUpperCase().indexOf("M3")!=-1||items[i].toUpperCase().indexOf("S")!=-1)&&pathCreated&&items[i].toUpperCase().indexOf("S")!=-1){
			if (parseInt(parser.parseS(items[i]))!=0){
				ReadyToAddPoint=true;
				path.power=parser.parseS(items[i]);
				continue;
			} else {
				shape.push(path);
				pathCreated=false;
			}
			continue;
		}
		if (items[i].toUpperCase().indexOf("G1")!=-1/*&&pathCreated*/){
			path.speed=parser.parseF(items[i]);
			path=parser.getPathPointXY(path,items[i],currentPoint,ReadyToAddPoint);
			currentPoint=parser.getCurrentPointXY(path,items[i],currentPoint,ReadyToAddPoint);
			continue;
		}
		
		if (pathCreated){
		path=parser.getPathPointXY(path,items[i],currentPoint,ReadyToAddPoint);
		currentPoint=parser.getCurrentPointXY(path,items[i],currentPoint,ReadyToAddPoint);
		}
	}
	
	//added to paths start and end points
	shape=startEnd.addStartEndPoint(shape);
	//added idle feed to shape
	shape=idleFeed.addIdleFeed(shape);
	
	//added border to shape
	shape=border.updateBorderShape(shape);
	//added length paths to shape
	shape=pathLen.addLengthPath(shape);
	
	//shape=idle.addIdleFeed(shape);
	
	return shape;
}
