let polyapp, myCanvas;
let ids = [];
let boxes = [];
let divisions = [];
let divDisplays = [];
let startDiv = 4;
let freeSounds = [];


function setup() {
	// Prevent p5 from generating own canvas
	myCanvas = createCanvas(0, 0);
	myCanvas.parent('myContainer');

	polyapp = new Poly("Polybeat");

	// Load Sounds : Kick, snare, hihat, conga, cowbell
	for(var i = 0; i < 5; i++) {
		freeSounds.push(loadSound('./resources/sounds/drums/' + i + '.mp3'));
	}
}

function draw() {
	// Update each divisions display
	for (var i = 0; i < divDisplays.length; i++) {
		divDisplays[i].html('Divisions: ' + divisions[i].value());
	}
}

class Poly {
	constructor(title) {
		this.title = title;

		this.add = createImg('./resources/pngs/add.png').position(10,10).size(130,100).style('border-radius', '10px');
		this.add.mousePressed(this.createPoly);
		markListener(this.add);
		
		this.header = select("#header").html(this.title);
	}
	createPoly(){

		let polybox = createElement('div', '').addClass('polybox').value((boxes.length + 1));
		boxes.push(polybox);

		let exit = createImg('./resources/pngs/exit.png').addClass('exit').parent(polybox);

		let id = createElement('div', 'beat: ' + (boxes.length)).addClass('boxtxt').parent(polybox).position(0, 10).style('font-size', '30px').center('horizontal');
		ids.push(id);

		let division = createSlider(1, 15, startDiv, 1).addClass('division').parent(polybox).position(0,60).center('horizontal'); 
		divisions.push(division);

		let divDisplay = createElement('div', 'Division: ' + startDiv).addClass('boxtxt').addClass('divDisplay').parent(polybox).position(0, 85).style('font-size', '15px').center('horizontal');
		divDisplays.push(divDisplay);

		exit.mousePressed(() => {
			// Delete
			ids.splice(polybox.value() - 1, 1);
			boxes.splice(polybox.value() - 1,1);
			divisions.splice(polybox.value() - 1, 1);
			divDisplays.splice(polybox.value() - 1, 1);
			polybox.remove();

			// Reassign
			for(var i = 0; i < boxes.length; i++) {
				ids[i].html("beat: " + (i+1));
				boxes[i].value(i+1);
				ids[i].value(i+1);
			}
		});
	}
	
}
function markListener(element){
	element.mouseOver(() => {
		element.style('background-color', "#F2C9ED");
	})
	element.mouseOut(() => {
		element.style('background-color', color(0,0,0,0));
	})
}

function keyPressed() {
	if(keyCode == 65) {
		freeSounds[0].play();
	}
	else if (keyCode == 83) {
		freeSounds[1].play();
	}
	else if (keyCode == 68) {
		freeSounds[2].play();
	}
	else if (keyCode == 70) {
		freeSounds[3].play();
	}
	else if (keyCode == 71) {
		freeSounds[4].play();
	}
}


