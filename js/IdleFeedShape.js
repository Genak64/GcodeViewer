const dist = require ('../js/distancePointsCalk.js');

function addIdleFeed(shape){
	
	var lengthIdleFeed=0;
	var pointBegin={};
	var pointEnd={};
	
		for(path in shape){
		
			if (Number.isInteger(parseInt(path))) {
				if (path==0) {
					pointBegin=shape[path].endPoint;
				}
				
				if (path>0) {
					pointEnd=shape[path].startPoint;
					
					lengthIdleFeed+=dist.getDistance(pointEnd.x,pointEnd.y,pointBegin.x,pointBegin.y);
					
					pointBegin=shape[path].endPoint;
					
				}
			}
		}

		shape[0].idleFeed=lengthIdleFeed.toFixed(2);

		return shape;
	}

module.exports={addIdleFeed};