const drawing=(function (){
	var width=400;
	var height=400;
	var strokeColor="blue";
	var canvas;
//	var ctx;

	

	function init(canvasName){
			canvas = document.getElementById(canvasName);
			canvas.width=width;
			canvas.height=height;
			if (canvas.getContext){
			var  ctx = canvas.getContext('2d');
			} else {
				throw error;
			}
		return ctx;
	}
	
	
	function setScale(viewPortWidth,viewPortHeight,maxX,maxY){
			const scaleFactor=1/0.95;
			var scaleX=maxX/viewPortWidth;
			var scaleY=maxY/viewPortHeight;
			var scale=scaleX>scaleY?scaleX:scaleY;
		return scale*scaleFactor;
	}

	
	function drawShape(shape,canvasName){
		var scale=setScale(width,height,shape.maxX,shape.maxY);
		var ctx=init(canvasName);
//	console.log(shape);
			if (canvas.getContext){
			   ctx = canvas.getContext('2d');
			for (namePath in shape){
				if (namePath!="maxX"&&namePath!="maxY"&&namePath!="minX"&&namePath!="minY"&&namePath!="width"&&namePath!="height"){
				var path=shape[namePath];
				
				drawPath(path,ctx,(shape.maxY+shape.minY),scale,height);
				}
			}
		}
	}
	
	
	function drawPath(path,ctx,offsetY,scale,height){
		
     		var x=parseFloat(path.points[0].x)/parseFloat(scale);
			var y=parseFloat(path.points[0].y)/parseFloat(scale)-parseFloat(height);  
		
			ctx.beginPath();
			
			ctx.moveTo(x,-y);
			
			for(i=0; i<path.points.length;i++){
				var x=parseFloat(path.points[i].x)/parseFloat(scale);
				var y=parseFloat(path.points[i].y)/parseFloat(scale)-parseFloat(height);
				
				ctx.lineTo(x,-y);
			}
//			ctx.closePath();
			ctx.strokeStyle=strokeColor;
			ctx.stroke();
    }

	
	function setViewport(widthView,heightView){
		width=widthView;
		height=heightView;
	}
	
	
	function setStrokeColor(color){
		strokeColor=color;
	}

	
	return {
		paint: function(shape,canvasName){
			drawShape(shape,canvasName);
		},
		
		setView: function(widthW,heightW){
			setViewport(widthW,heightW);
		},
		setColor: function(color){
			setStrokeColor(color);
		}
		
		
	}
	
}());
