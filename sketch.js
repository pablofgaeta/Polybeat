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

		this.add = createButton('+');
		this.add.position(10,30);
		this.add.size(50,50);
		this.add.mousePressed(this.createPoly);
		
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
}


