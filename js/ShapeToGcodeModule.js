/*
Converting shape and getting g-code
*/
	function getGcode(shape){
		var gcode=[];
	
		for (namePath in shape){
			var path=shape[namePath];
			var gcodePart=createGcodePart(path)
			gcode.push.apply(gcode,gcodePart);
		}
		gcode.push("M5");
	
		return gcode;
	}

	function createGcodePart(path){

		var partGcode=[];
	
		partGcode.push("M5");
		partGcode.push("G0"+"X"+path.points[0].x.toString()+"Y"+path.points[0].y.toString());
		partGcode.push("M4 S"+path.power);
		partGcode.push("G1"+"X"+path.points[1].x.toString()+"Y"+path.points[1].y.toString()+"F"+path.speed);

		for (i=2;i<path.points.length;i++){
			partGcode.push("X"+path.points[i].x.toString()+"Y"+path.points[i].y.toString());
		}
	
		return partGcode;
	}

module.exports = getGcode;
