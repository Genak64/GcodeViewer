const assert = require('assert');
const borderShape = require ('../js/updateBorderShape.js');

describe('Test updateBorderShape(shape)', ()=>{
	
	var shape=[];
	var path={
		points:[]
	};
	var point={};
	
	
	/*
	
	0: {x: 0.13, y: 96.14}
	1: {y: 0.13, x: 0.13}
	2: {x: 124.86, y: 0.13}
	3: {y: 134.69, x: 124.86}
	4: {x: 0.13, y: 96.14}
	
	power: "650.00"
	speed: "1800.00"
	
	height: 134.69
	maxX: 124.86
	maxY: 134.69
	minX: 0
	minY: 0
	width: 124.86
	*/
	
	var p=[{x:0.13, y:96.14},{x:0.13, y:0.13},{x:124.86, y:0.13},{x:124.86, y:134.69},{x:0.13, y:96.14}]
	
	for(item in p){
		path.points.push(p[item]);
	}
	path.power="650.00";
	path.speed="1000.00";
	
	shape.push(path);
	
	var str=['x: 0.13, y: 96.14',
	'y: 0.13, x: 0.13',
	'x: 124.86, y: 0.13',
	'y: 134.69, x: 124.86',
	'x: 0.13, y: 96.14',
	
	'power: "650.00"',
	'speed: "1800.00"',
	
	'height: 134.69',
	'maxX: 124.86',
	'maxY: 134.69',
	'minX: 0',
	'minY: 0',
	'width: 124.86"'];

	it(' get maxX '+borderShape.updateBorderShape(shape).maxX, () => {
	  assert.equal(borderShape.updateBorderShape(shape).maxX, 124.86);
	});	

	it(' get maxY '+borderShape.updateBorderShape(shape).maxY, () => {
	  assert.equal(borderShape.updateBorderShape(shape).maxY, 134.69);
	});	

	it(' get minY '+borderShape.updateBorderShape(shape).minY, () => {
	  assert.equal(borderShape.updateBorderShape(shape).minY, 0);
	});
	
	it(' get minX '+borderShape.updateBorderShape(shape).minX, () => {
	  assert.equal(borderShape.updateBorderShape(shape).minX, 0);
	});
	
	it(' get height '+borderShape.updateBorderShape(shape).height, () => {
	  assert.equal(borderShape.updateBorderShape(shape).height, 134.69);
	});
	
	it(' get width '+borderShape.updateBorderShape(shape).width, () => {
	  assert.equal(borderShape.updateBorderShape(shape).width, 124.86);
	});
	
});

