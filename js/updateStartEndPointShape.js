
function addStartEndPoint(shape){
	
		for(path in shape){
		
			if (Number.isInteger(parseInt(path))) {

				shape[path].startPoint=shape[path].points[0];
				shape[path].endPoint=shape[path].points[shape[path].points.length-1];

			}
		}

		return shape;
	}

module.exports={addStartEndPoint};