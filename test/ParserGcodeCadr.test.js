const assert = require('assert');
const parser = require ('../js/ParserGcodeCadr.js');

describe('Test parseX(cadr)', ()=>{
	
	cadr='X10.15Y15.35';
	
	it('(Cadr='+cadr+') get '+parser.parseX(cadr), () => {
	  assert.equal(parser.parseX(cadr), 10.15);
	});	

	cadr='X10,15Y15.35';
	
	it('(Cadr='+cadr+') get '+parser.parseX(cadr), () => {
	  assert.equal(parser.parseX(cadr), 10.15);
	});
	
	cadr='Y15.35X10,15';
	
	it('(Cadr='+cadr+') get '+parser.parseX(cadr), () => {
	  assert.equal(parser.parseX(cadr), 10.15);
	});
	
	cadr='X 10.15 Y 15.35';
	
	it('(Cadr='+cadr+') get '+parser.parseX(cadr), () => {
	  assert.equal(parser.parseX(cadr), 10.15);
	});
	
	cadr='G1X10.15Y15.35F1000';
	
	it('(Cadr='+cadr+') get '+parser.parseX(cadr), () => {
	  assert.equal(parser.parseX(cadr), 10.15);
	});
	
});

describe('Test parseY(cadr)', ()=>{
	
	cadr='X10.15Y15.35';
	
	it('(Cadr='+cadr+') get '+parser.parseY(cadr), () => {
	  assert.equal(parser.parseY(cadr), 15.35);
	});	

	cadr='X10,15Y15,35';
	
	it('(Cadr='+cadr+') get '+parser.parseY(cadr), () => {
	  assert.equal(parser.parseY(cadr), 15.35);
	});
	
	cadr='Y15,35X10,15';
	
	it('(Cadr='+cadr+') get '+parser.parseY(cadr), () => {
	  assert.equal(parser.parseY(cadr), 15.35);
	});
	
	cadr='X 10.15 Y 15.35';
	
	it('(Cadr='+cadr+') get '+parser.parseY(cadr), () => {
	  assert.equal(parser.parseY(cadr), 15.35);
	});
	
	cadr='G1X10.15Y15.35F1000';
	
	it('(Cadr='+cadr+') get '+parser.parseY(cadr), () => {
	  assert.equal(parser.parseY(cadr), 15.35);
	});
	
});


describe('Test parseS(cadr)', ()=>{
	
	cadr1='M4 S110';
	
	it('(Cadr='+cadr1+') get '+parser.parseS(cadr1), () => {
	  assert.equal(parser.parseS(cadr1), 110);
	});

	cadr1='M4 S 110';
	
	it('(Cadr='+cadr1+') get '+parser.parseS(cadr1), () => {
	  assert.equal(parser.parseS(cadr1), 110);
	});

	cadr1='M4S110';
	
	it('(Cadr='+cadr1+') get '+parser.parseS(cadr1), () => {
	  assert.equal(parser.parseS(cadr1), 110);
	});

    cadr1='M4 S110.00';
	
	it('(Cadr='+cadr1+') get '+parser.parseS(cadr1), () => {
	  assert.equal(parser.parseS(cadr1), 110);
	});

	cadr1='M4 S110,00';
	
	it('(Cadr='+cadr1+') get '+parser.parseS(cadr1), () => {
	  assert.equal(parser.parseS(cadr1), 110);
	});	

	
});


describe('Test parseF(cadr)', ()=>{
	
	cadrF='G1X65.59Y50.48F10000';
	
	it('(Cadr='+cadrF+') get '+parser.parseF(cadrF), () => {
	  assert.equal(parser.parseF(cadrF), 10000);
	});
	
	cadrF='G1X65.59Y50.48F10000.00';
	
	it('(Cadr='+cadrF+') get '+parser.parseF(cadrF), () => {
	  assert.equal(parser.parseF(cadrF), 10000);
	});
	
	cadrF='G1X65.59Y50.48F10000,00';
	
	it('(Cadr='+cadrF+') get '+parser.parseF(cadrF), () => {
	  assert.equal(parser.parseF(cadrF), 10000);
	});
	
	cadrF='G1 X65.59 Y50.48 F 10000';
	
	it('(Cadr='+cadrF+') get '+parser.parseF(cadrF), () => {
	  assert.equal(parser.parseF(cadrF), 10000);
	});

});
