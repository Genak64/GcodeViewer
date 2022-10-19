const dist = require ('../js/distancePointsCalk.js');

function addLengthPath(shape){
	
		for(path in shape){
		
			if (Number.isInteger(parseInt(path))) {
				
				var len=0;
				
				for (i=1;i<shape[path].points.length;i++){
					
					var x1=shape[path].points[i-1].x;
					var y1=shape[path].points[i-1].y;
					var x2=shape[path].points[i].x;
					var y2=shape[path].points[i].y;
					
					var len=len+dist.getDistance(x1,y1,x2,y2);
					
				}
				shape[path].pathLength=len;
			}
		}

		return shape;
	}
	
module.exports={addLengthPath};