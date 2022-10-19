const borderCalk = require ('../js/borderCalk.js');

function updateBorderShape(shape){
	
			var minX=0;
			var minY=0;
			var maxX=0;
			var maxY=0;

		for(path in shape){
		
			if (Number.isInteger(parseInt(path))) {

				for(points in path){
					for (p in shape[path].points){
					
						minX=borderCalk.getMinX(minX,shape[path].points[p].x);
						minY=borderCalk.getMinY(minY,shape[path].points[p].y);
						maxX=borderCalk.getMaxX(maxX,shape[path].points[p].x);
						maxY=borderCalk.getMaxY(maxY,shape[path].points[p].y);
					}
				}
			}
		}
		shape.minX=minX;
		shape.minY=minY;
		shape.maxX=maxX;
		shape.maxY=maxY;

		shape.height=borderCalk.getHeight(maxY,minY);
		shape.width=borderCalk.getWidth(maxX,minX);
		
		return shape;
	}
	
module.exports={updateBorderShape};