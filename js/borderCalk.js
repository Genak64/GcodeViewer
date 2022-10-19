


function getMinX(minX,x){
	return minX>x?x:minX;
}

function getMinY(minY,y){
	return minY>y?y:minY;
}

function getMaxX(maxX,x){
	return maxX<x?x:maxX;
}

function getMaxY(maxY,y){
	return maxY<y?y:maxY;
}

function getHeight(maxY,minY){
	return Math.abs(maxY-minY);
}

function getWidth(maxX,minX){
	return Math.abs(maxX-minX);
}

module.exports={getMinX,getMinY,getMaxX,getMaxY,getHeight,getWidth};