
	var minX=0;
	var minY=0;
	var maxX=0;
	var maxY=0;
	
	
	function parseXY (item){
	var point={};
	item=item.toUpperCase();
	point.x=parseFloat(parseX(item));
	point.y=parseFloat(parseY(item));
	return point;
	}

	function parseS (item){
	item=item.toUpperCase();
	return parseFloat(item.slice(item.indexOf("S")+1).replace(/[,]+/g, '.')).toFixed(2);
	}

	function parseF (item){
	item=item.toUpperCase();
	return parseFloat(item.slice(item.indexOf("F")+1).replace(/[,]+/g, '.')).toFixed(2);
	}

	function parseX (item){
	item=item.toUpperCase();
	return parseFloat(item.slice(item.indexOf("X")+1).replace(/[,]+/g, '.')).toFixed(2);
	}

	function parseY (item){
	item=item.toUpperCase();
	return parseFloat(item.slice(item.indexOf("Y")+1).replace(/[,]+/g, '.')).toFixed(2);
	}
/*
Converting g-code and getting shape 
*/	
	function getShape(items){
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
			point=parseXY(items[i]);
			path.points.push(point);
			currentPoint=point;
			continue;
		}
		if ((items[i].indexOf("M4")!=-1||items[i].indexOf("M3")!=-1)&&pathCreated){
			RedyToAddPoint=true;
			path.power=parseS(items[i]);
			continue;
		}
		if (items[i].indexOf("G1")!=-1&&pathCreated){
			path.speed=parseF(items[i]);
			
			if (items[i].indexOf("X")!=-1&&items[i].indexOf("Y")!=-1&&RedyToAddPoint){
				point=parseXY(items[i]);
				path.points.push(point);
				currentPoint=point;
			} else {
				if (items[i].indexOf("X")!=-1) {
					point = {};
					point.x=parseFloat(parseX(items[i]));
					point.y=parseFloat(currentPoint.y);
					path.points.push(point);
					currentPoint=point;
					continue
				} 
				if (items[i].indexOf("Y")!=-1) {
					point = {};
					point.y=parseFloat(parseY(items[i]));
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
			point=parseXY(items[i]);
			path.points.push(point);
			currentPoint=point;
		} else {
			if (items[i].indexOf("X")!=-1) {
				point = {};
				point.x=parseFloat(parseX(items[i]));
				point.y=parseFloat(currentPoint.y);
				path.points.push(point);
				currentPoint=point;
				continue
			} 
			if (items[i].indexOf("Y")!=-1) {
				point = {};
				point.x=parseFloat(currentPoint.x);
				point.y=parseFloat(parseY(items[i]));
				path.points.push(point);
				currentPoint=point;
				continue
			}
			
		}
	
	}
	
	for(path in shape){
		for(points in path){
			for (p in shape[path].points){
				
				if (minX>shape[path].points[p].x){
					minX=shape[path].points[p].x
					}
				if (minY>shape[path].points[p].y){
					minY=shape[path].points[p].y
					}
				if (maxX<shape[path].points[p].x){
					maxX=shape[path].points[p].x
					}
				if (maxY<shape[path].points[p].y){
					maxY=shape[path].points[p].y
					}
			}
		}
	}
	
	shape.minX=minX;
	shape.minY=minY;
	shape.maxX=maxX;
	shape.maxY=maxY;
	shape.width=Math.abs(maxY)-Math.abs(minY);
	shape.height=Math.abs(maxX)-Math.abs(minX);
	
//	console.log(shape);
	return shape;
}
	

module.exports = getShape;
