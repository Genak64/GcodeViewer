const assert = require('assert');
const borderCalk = require ('../js/borderCalk.js');

describe('Test getMinX(minX,x)', ()=>{
	
	x=[0,0.1,3,-0.1,-5];
	minX=0;
	
	for(item in x){
		it('(minX='+minX+',x='+x[item]+') get '+borderCalk.getMinX(minX,x), () => {
		  assert.equal(borderCalk.getMinX(minX,x), 0);
		});		
	}

	it('(minX='+1+',x='+0+') get '+borderCalk.getMinX(1,0), () => {
	  assert.equal(borderCalk.getMinX(1,0), 0);
	});		
	
	it('(minX='+1+',x='+2+') get '+borderCalk.getMinX(1,2), () => {
	  assert.equal(borderCalk.getMinX(1,2), 1);
	});
	
	it('(minX='+1+',x='+0.5+') get '+borderCalk.getMinX(1,0.5), () => {
	  assert.equal(borderCalk.getMinX(1,0.5), 0.5);
	});
	
	it('(minX='+1+',x='+-1+') get '+borderCalk.getMinX(1,-1), () => {
	  assert.equal(borderCalk.getMinX(1,-1), -1);
	});

	it('(minX='+0+',x='+-1+') get '+borderCalk.getMinX(0,-1), () => {
	  assert.equal(borderCalk.getMinX(0,-1), -1);
	});
});


describe('Test getMinY(minY,y)', ()=>{
	
	y=[0,0.1,3,-0.1,-5];
	minY=0;
	
	for(item in y){
		it('(minY='+minY+',y='+x[item]+') get '+borderCalk.getMinY(minY,y), () => {
		  assert.equal(borderCalk.getMinY(minY,y), 0);
		});		
	}

	it('(minY='+1+',y='+0+') get '+borderCalk.getMinY(1,0), () => {
	  assert.equal(borderCalk.getMinY(1,0), 0);
	});		
	
	it('(minY='+1+',y='+2+') get '+borderCalk.getMinY(1,2), () => {
	  assert.equal(borderCalk.getMinY(1,2), 1);
	});
	
	it('(minY='+1+',y='+0.5+') get '+borderCalk.getMinY(1,0.5), () => {
	  assert.equal(borderCalk.getMinY(1,0.5), 0.5);
	});
	
	it('(minY='+1+',y='+-1+') get '+borderCalk.getMinY(1,-1), () => {
	  assert.equal(borderCalk.getMinY(1,-1), -1);
	});

	it('(minY='+0+',y='+-1+') get '+borderCalk.getMinY(0,-1), () => {
	  assert.equal(borderCalk.getMinY(0,-1), -1);
	});
});

describe('Test getMaxX(maxX,x)', ()=>{
	
	x=[0,0.1,3,-0.1,-5];
	maxX=5;
	
	for(item in x){
		it('(MaxX='+maxX+',x='+x[item]+') get '+borderCalk.getMaxX(maxX,x), () => {
		  assert.equal(borderCalk.getMaxX(maxX,x), 5);
		});		
	}

	it('(MaxX='+1+',x='+0+') get '+borderCalk.getMaxX(1,0), () => {
	  assert.equal(borderCalk.getMaxX(1,0), 1);
	});		
	
	it('(MaxX='+1+',x='+2+') get '+borderCalk.getMaxX(1,2), () => {
	  assert.equal(borderCalk.getMaxX(1,2), 2);
	});
	
	it('(MaxX='+1+',x='+0.5+') get '+borderCalk.getMaxX(1,0.5), () => {
	  assert.equal(borderCalk.getMaxX(1,0.5), 1);
	});
	
	it('(MaxX='+1+',x='+-1+') get '+borderCalk.getMaxX(1,-1), () => {
	  assert.equal(borderCalk.getMaxX(1,-1), 1);
	});

	it('(MaxX='+0+',x='+-1+') get '+borderCalk.getMaxX(0,-1), () => {
	  assert.equal(borderCalk.getMaxX(0,-1), 0);
	});
});

describe('Test getMaxY(MaxY,x)', ()=>{
	
	x=[0,0.1,3,-0.1,-5];
	maxY=5;
	
	for(item in x){
		it('(MaxY='+maxY+',x='+x[item]+') get '+borderCalk.getMaxY(maxY,x), () => {
		  assert.equal(borderCalk.getMaxY(maxY,x), 5);
		});		
	}

	it('(MaxY='+1+',x='+0+') get '+borderCalk.getMaxY(1,0), () => {
	  assert.equal(borderCalk.getMaxY(1,0), 1);
	});		
	
	it('(MaxY='+1+',x='+2+') get '+borderCalk.getMaxY(1,2), () => {
	  assert.equal(borderCalk.getMaxY(1,2), 2);
	});
	
	it('(MaxY='+1+',x='+0.5+') get '+borderCalk.getMaxY(1,0.5), () => {
	  assert.equal(borderCalk.getMaxY(1,0.5), 1);
	});
	
	it('(MaxY='+1+',x='+-1+') get '+borderCalk.getMaxY(1,-1), () => {
	  assert.equal(borderCalk.getMaxY(1,-1), 1);
	});

	it('(MaxY='+0+',x='+-1+') get '+borderCalk.getMaxY(0,-1), () => {
	  assert.equal(borderCalk.getMaxY(0,-1), 0);
	});
});

describe('Test getHeight(maxY,minY)', ()=>{
	
	it('(MaxY='+1+',minY='+0+') get '+borderCalk.getHeight(1,0), () => {
	  assert.equal(borderCalk.getHeight(1,0), 1);
	});		
	
	it('(MaxY='+0+',minY='+-1+') get '+borderCalk.getHeight(0,-1), () => {
	  assert.equal(borderCalk.getHeight(0,-1), 1);
	});
	
	it('(MaxY='+1+',minY='+-1+') get '+borderCalk.getHeight(1,-1), () => {
	  assert.equal(borderCalk.getHeight(1,-1), 2);
	});
	
	it('(MaxY='+3+',minY='+1+') get '+borderCalk.getHeight(3,1), () => {
	  assert.equal(borderCalk.getHeight(3,1), 2);
	});
	
	it('(MaxY='+-3+',minY='+-5+') get '+borderCalk.getHeight(-3,-5), () => {
	  assert.equal(borderCalk.getHeight(-3,-5), 2);
	});
	
});

describe('Test getWidth(maxX,minX)', ()=>{
	
	it('(maxX='+1+',minX='+0+') get '+borderCalk.getWidth(1,0), () => {
	  assert.equal(borderCalk.getWidth(1,0), 1);
	});		
	
	it('(maxX='+0+',minX='+-1+') get '+borderCalk.getWidth(0,-1), () => {
	  assert.equal(borderCalk.getWidth(0,-1), 1);
	});
	
	it('(maxX='+1+',minX='+-1+') get '+borderCalk.getWidth(1,-1), () => {
	  assert.equal(borderCalk.getWidth(1,-1), 2);
	});
	
	it('(maxX='+3+',minX='+1+') get '+borderCalk.getWidth(3,1), () => {
	  assert.equal(borderCalk.getWidth(3,1), 2);
	});
	
	it('(maxX='+-3+',minX='+-5+') get '+borderCalk.getWidth(-3,-5), () => {
	  assert.equal(borderCalk.getWidth(-3,-5), 2);
	});
	
});