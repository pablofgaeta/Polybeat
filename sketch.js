let polyapp, myCanvas;
let ids = [];
let boxes = [];
let divisions = [];
let divDisplays = [];
let startDiv = 4;


function setup() {
	myCanvas = createCanvas(0, 0);
	myCanvas.parent('myContainer');

	polyapp = new Poly("Polybeat");
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

		this.add = createImg('./pngs/add.png').position(10,10).size(130,100).style('border-radius', '10px');
		this.add.mousePressed(this.createPoly);
		markListener(this.add);
		
		this.header = select("#header").html(this.title);
	}
	createPoly(){

		let polybox = createElement('div', '').addClass('polybox').value((boxes.length + 1));
		boxes.push(polybox);

		let exit = createImg('./pngs/exit.png').addClass('exit').parent(polybox);

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


