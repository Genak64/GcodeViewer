const transformShape=(function (){
	
	function updateBorderShape(shape){
			var minX=0;
			var minY=0;
			var maxX=0;
			var maxY=0;

		for(path in shape){
		
			if (Number.isInteger(parseInt(path))) {
//				minX=shape[path].points[0].x;
//				minY=shape[path].points[0].y;
//				maxX=shape[path].points[0].x;
//				maxY=shape[path].points[0].y;

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
	
	function cloneShape(shape){
	
	return JSON.parse(JSON.stringify(shape));
	
	}
	
	function translateShapeFromX(shape,offsetX){

		var newshape=[];

		for (originalPathName in shape){
			if (Number.isInteger(parseInt(originalPathName))) {

			var	points=shape[originalPathName].points.slice();
			
				points=JSON.parse(JSON.stringify(points));
		
				for(i=0;i<points.length;i++){
					points[i].x=points[i].x+offsetX;
				}
				
			var	path={
					points:[]
				};
				
				path.points.push.apply(path.points,points);
				points=[];
				path.power=shape[originalPathName].power;
				path.speed=shape[originalPathName].speed;

			newshape.push(path);
			}
		
		}

		return updateBorderShape(newshape);
	}
	
	
	function translateShapeFromY(shape,offsetY){

		var newshape=[];

		for (originalPathName in shape){
			if (Number.isInteger(parseInt(originalPathName))) {

			var	points=shape[originalPathName].points.slice();
			
				points=JSON.parse(JSON.stringify(points));
		
				for(i=0;i<points.length;i++){
					points[i].y=points[i].y+offsetY;
				}
				
			var	path={
					points:[]
				};
				
				path.points.push.apply(path.points,points);
				points=[];
				path.power=shape[originalPathName].power;
				path.speed=shape[originalPathName].speed;

			newshape.push(path);
			}
		
		}

		return updateBorderShape(newshape);
	}
	
	
	function translateShapeFromXY(shape,offsetX,offsetY){

		var newshape=[];

		for (originalPathName in shape){
			if (Number.isInteger(parseInt(originalPathName))) {

			var	points=shape[originalPathName].points.slice();
			
				points=JSON.parse(JSON.stringify(points));
		
				for(i=0;i<points.length;i++){
					points[i].y=points[i].y+offsetY;
					points[i].x=points[i].x+offsetX;
				}
				
			var	path={
					points:[]
				};
				
				path.points.push.apply(path.points,points);
				points=[];
				path.power=shape[originalPathName].power;
				path.speed=shape[originalPathName].speed;

			newshape.push(path);
			}
		
		}
		return updateBorderShape(newshape);
	}
	
	
	function addNewshapeToShape(shape, addedShape){
	
	for (originalPathName in addedShape){
		if (Number.isInteger(parseInt(originalPathName))) {
		shape.push(addedShape[originalPathName]);
		}
	}
	return updateBorderShape(shape);
}

	
	function dublicateShapeFromX(shapeOriginal,numberOfCopy,offset){
		var offsetX=shapeOriginal.width+offset;
		var shape=transformShape.clone(shapeOriginal);
		
		for(var j=1;j<numberOfCopy;j++){
			var	tempShape=transformShape.translateX(shapeOriginal,offsetX*j)
			shape=transformShape.split(shape,tempShape);
		}
		return shape;
	}

	
	function dublicateShapeFromY(shapeOriginal,numberOfCopy,offset){
		var offsetY=shapeOriginal.height+offset;
		var shape=transformShape.clone(shapeOriginal);

		for(var k=1;k<numberOfCopy;k++){
			var	tempShape=transformShape.translateY(shapeOriginal,offsetY*k)
			shape=transformShape.split(shape,tempShape);
		}
		return shape;
	}

	
	function createShapeDublicate(shapeOriginal,numberOfCopyX,numberOfCopyY,offset){
		
		var shape;
		if (numberOfCopyX>1&&numberOfCopyY<2) {
			shape=dublicateShapeFromX(shapeOriginal,numberOfCopyX,offset);
		}
		if (numberOfCopyX<2&&numberOfCopyY>2) {
			shape=dublicateShapeFromY(shapeOriginal,numberOfCopyY,offset);
			
		} else {
			shape=dublicateShapeFromX(shapeOriginal,numberOfCopyX,offset);
			shape=dublicateShapeFromY(shape,numberOfCopyY,offset);
		}
		
		return shape;
	}


	return {
		translateX: function(shape,offsetX){
			return translateShapeFromX(shape,offsetX);
		},
		translateY: function(shape,offsetY){
			return translateShapeFromY(shape,offsetY);
		},
		translateXY: function(shape,offsetX,offsetY){
			return translateShapeFromXY(shape,offsetX,offsetY);
		},
		split: function(shape,addedShape){
			return addNewshapeToShape(shape,addedShape);
		},
		clone: function (shape){
			return cloneShape(shape);
		},
		dublicate: function (shape,numberOfCopyX,numberOfCopyY,offset){
			return createShapeDublicate(shape,numberOfCopyX,numberOfCopyY,offset);
		}
		
	}
	
	
}());


