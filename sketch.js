let polyapp, myCanvas;
let ids = [];

function setup() {
	myCanvas = createCanvas(0, 0);
	myCanvas.parent('myContainer');

	polyapp = new Poly("Polybeat");
}

function draw() {
	// push();
	// noStroke();
	// fill(255,0,255);
	// ellipse(25,25,25);
	// pop();
}

class Poly {
	constructor(title) {
		this.title = title;

		this.add = createImg('./pngs/add.png').position(10,10).size(130,100).style('border-radius', '10px');
		this.add.mousePressed(this.createPoly);
		this.markListener(this.add);

		
		this.header = select("#header").html(this.title);
	}
	createPoly(){

		var polybox = createElement('div', '').addClass('polybox');

		var exit = createImg('./pngs/exit.png').addClass('exit').parent(polybox);

		var id = createElement('div', 'beat: ' + (ids.length + 1)).addClass('id').parent(polybox).value((ids.length + 1));

		ids.push(id);

		exit.mousePressed(() => {
			polybox.remove();
			exit.remove();
			ids.splice(id.value()-1,1);
			id.remove();
			for(var i = 0; i < ids.length; i++) {
				ids[i].html("beat: " + (i+1));
				ids[i].value(i+1);
			}
		});
	}
	markListener(element){
		element.mouseOver(() => {
			element.style('background-color', "#F2C9ED");
		})
		element.mouseOut(() => {
			element.style('background-color', "#FFFFFF");
		})
	}
}


