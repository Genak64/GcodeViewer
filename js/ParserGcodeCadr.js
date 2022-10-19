/*
Parsing parts cadr g-code programm
*/
	
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

	function getPointToCadrX(cadr,currentPoint){
		point = {};
		point.x=parseFloat(parseX(cadr));
		point.y=parseFloat(currentPoint.y);
		return point;
	}	

	function getPointToCadrY(cadr,currentPoint){
		point = {};
		point.y=parseFloat(parseY(cadr));
		point.x=parseFloat(currentPoint.x);
		return point;
	}
	
	function getPointToCadrXorY(cadr,currentPoint){
		if (cadr.indexOf("X")!=-1) {
			return getPointToCadrX(cadr,currentPoint);
		} 
		if (cadr.indexOf("Y")!=-1) {
			return getPointToCadrY(cadr,currentPoint);
		}
		return currentPoint;			
	}

	function getPointToCadrXandY(cadr,currentPoint){
		point = {};
		point=parseXY(cadr);
		return point;			
	}

	function getCurrentPointXY(path,cadr,currentPoint,ReadyToAddPoint){
		if (cadr.indexOf("X")!=-1&&cadr.indexOf("Y")!=-1&&ReadyToAddPoint){
				currentPoint=getPointToCadrXandY(cadr,currentPoint);
			} else {
				currentPoint=getPointToCadrXorY(cadr,currentPoint);
			}
		return currentPoint;
	}

	function getPathPointXY(path,cadr,currentPoint,ReadyToAddPoint){
		if (cadr.indexOf("X")!=-1&&cadr.indexOf("Y")!=-1&&ReadyToAddPoint){
				path.points.push(getPointToCadrXandY(cadr,currentPoint));
			} else {
				path.points.push(getPointToCadrXorY(cadr,currentPoint));
			}
		return path;
	}

module.exports={parseXY,parseS,parseF,parseX,parseY,getPointToCadrX,getPointToCadrY,getPointToCadrXorY,getPointToCadrXandY,getCurrentPointXY,getPathPointXY};