class gParser{

	constructor (){
		this.minX=0;
		this.minY=0;
		this.maxX=0;
		this.maxY=0;
	}
	
	#parseXY (cadr){
	var point={};
	cadr=cadr.toUpperCase();
	point.x=parseFloat(this.#parseX(cadr));
	point.y=parseFloat(this.#parseY(cadr));
	return point;
	}

	#parseS (cadr){
	cadr=cadr.toUpperCase();
	return parseInt(cadr.slice(cadr.indexOf("S")+1).replace(/[,]+/g, '.')).toFixed(2);
	}

	#parseF (cadr){
	cadr=cadr.toUpperCase();
	return parseInt(cadr.slice(cadr.indexOf("F")+1).replace(/[,]+/g, '.')).toFixed(2);
	}

	#parseX (cadr){
	cadr=cadr.toUpperCase();
	return parseFloat(cadr.slice(cadr.indexOf("X")+1).replace(/[,]+/g, '.')).toFixed(2);
	}

	#parseY (cadr){
	cadr=cadr.toUpperCase();
	return parseFloat(cadr.slice(cadr.indexOf("Y")+1).replace(/[,]+/g, '.')).toFixed(2);
	}
	
	#updateBorderShape(shape){
		for(path in shape){
			for(points in path){
				for (p in shape[path].points){
					
					if (this.minX>shape[path].points[p].x){
						this.minX=shape[path].points[p].x
						}
					if (this.minY>shape[path].points[p].y){
						this.minY=shape[path].points[p].y
						}
					if (this.maxX<shape[path].points[p].x){
						this.maxX=shape[path].points[p].x
						}
					if (this.maxY<shape[path].points[p].y){
						this.maxY=shape[path].points[p].y
						}
				}
			}
		}
	
		shape.minX=this.minX;
		shape.minY=this.minY;
		shape.maxX=this.maxX;
		shape.maxY=this.maxY;
		shape.width=Math.abs(this.maxY)-Math.abs(this.minY);
		shape.height=Math.abs(this.maxX)-Math.abs(this.minX);
		
		
		return shape;
	}
	
	cadresToShape(cadres){
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
	
		for(i=0; i<cadres.length;i++){
			if (cadres[i].indexOf("M5")!=-1&&!pathCreated){
				
				continue;
			}
			if (cadres[i].indexOf("M5")!=-1&&pathCreated){
				shape.push(path);
				pathCreated=false;
				continue;
			}
			if (cadres[i].indexOf("G0")!=-1&&!pathCreated){
				pathCreated=true;
				path={
					points:[]
				};
				point = {};
				point=this.#parseXY(cadres[i]);
				path.points.push(point);
				currentPoint=point;
				continue;
			}
			if ((cadres[i].indexOf("M4")!=-1||cadres[i].indexOf("M3")!=-1)&&pathCreated){
				RedyToAddPoint=true;
				path.power=parseInt(this.#parseS(cadres[i]));
				continue;
			}
			if (cadres[i].indexOf("G1")!=-1&&pathCreated){
				path.speed=parseInt(this.#parseF(cadres[i]));
				
				if (cadres[i].indexOf("X")!=-1&&cadres[i].indexOf("Y")!=-1&&RedyToAddPoint){
					point=this.#parseXY(cadres[i]);
					path.points.push(point);
					currentPoint=point;
				} else {
					if (cadres[i].indexOf("X")!=-1) {
						point = {};
						point.x=parseFloat(this.#parseX(cadres[i]));
						point.y=parseFloat(currentPoint.y);
						path.points.push(point);
						currentPoint=point;
						continue
					} 
					if (cadres[i].indexOf("Y")!=-1) {
						point = {};
						point.y=parseFloat(this.#parseY(cadres[i]));
						point.x=parseFloat(currentPoint.x);
						path.points.push(point);
						currentPoint=point;
						continue
					}
				}
				continue;
			}
			if (cadres[i].indexOf("X")!=-1&&cadres[i].indexOf("Y")!=-1&&RedyToAddPoint){
				point = {};
				point=this.#parseXY(cadres[i]);
				path.points.push(point);
				currentPoint=point;
			} else {
				if (cadres[i].indexOf("X")!=-1) {
					point = {};
					point.x=parseFloat(this.#parseX(cadres[i]));
					point.y=parseFloat(currentPoint.y);
					path.points.push(point);
					currentPoint=point;
					continue
				} 
				if (cadres[i].indexOf("Y")!=-1) {
					point = {};
					point.x=parseFloat(currentPoint.x);
					point.y=parseFloat(this.#parseY(cadres[i]));
					path.points.push(point);
					currentPoint=point;
					continue
				}
				
			}
		
		}
	
		return this.#updateBorderShape(shape);
	}

	
	static #createGcodePart(path){

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
	
	
	static createGcode(shape){
		var gcode=[];
	
		for (namePath in shape){
			if (Number.isInteger(parseInt(namePath))){
				var path=shape[namePath];
				var gcodePart=gParser.#createGcodePart(path);
				gcode.push.apply(gcode,gcodePart);
			}
		}
		gcode.push("M5");
	
		return gcode;
	}
	
	

}