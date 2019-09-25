let polyapp, myCanvas;
let ids = [];
let boxes = [];
let divisions = [];
let divisionsCopy;
let divDisplays = [];
let startDiv = 4;
let freeSounds = [];
let soundLoops;
let masterLoop;


function setup() {
	noCanvas();

	soundLoops = new Array(50);
	soundLoops.fill(null);

	divisionsCopy = new Array(50);
	divisionsCopy.fill(null);

	polyapp = new Poly("Polybeat");
	

	// Load Sounds : Kick, snare, hihat, conga, cowbell
	for(var i = 0; i < 5; i++) {
		freeSounds.push(loadSound('./resources/sounds/drums/' + i + '.mp3'));
	}

	// Master loop for modules to slave off of
	masterLoop = new p5.SoundLoop(() => {
		// Nothing happens, just used to sync all loops
	});
	masterLoop.start();
}

function draw() {
	// Update each divisions display
	for (var i = 0; i < divisions.length; i++) {
		divDisplays[i].html('Divisions: ' + divisions[i].value());
		if (soundLoops[i] != null && Number(divisionsCopy[i]) != Number(divisions[i].value())) {
			soundLoops[i].interval = normalizeTempo(divisions[i].value());
			if(soundLoops[i].isPlaying) {
				soundLoops[i].stop();
				soundLoops[i].syncedStart(masterLoop);
			}
		}
	}
	filldivcopy();
}

function filldivcopy() {
	for(var i = 0; i < divisions.length; i++) {
		divisionsCopy[i] = divisions[i].value();
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

		// Poly box is the container for each beat module
		let polybox = createElement('div', '').addClass('polybox').value((boxes.length + 1));
		boxes.push(polybox);

		// Exit is a button for closing a module. Mouse Pressed fxn defined after all elements defined
		let exit = createImg('./resources/pngs/exit.png').addClass('exit').parent(polybox);

		// Id displays the index of module starting at 1. Updates dynamically when modules are deleted
		let id = createElement('div', 'beat: ' + (boxes.length)).addClass('boxtxt').parent(polybox).position(0, 10).style('font-size', '30px').center('horizontal');
		ids.push(id);

		// A slider for storing the polyrhythm division of current module
		let division = createSlider(1, 16, startDiv, 1).addClass('division').parent(polybox).position(0,80).center('horizontal'); 
		divisions.push(division);

		// Display that shows the current division chosen
		let divDisplay = createElement('div', 'Division: ' + startDiv).addClass('boxtxt').addClass('divDisplay').parent(polybox).position(0, 105).style('font-size', '15px').center('horizontal');
		divDisplays.push(divDisplay);

		// Select displays the options for drum type
		let select = createElement('select',
			'<optgroup label="Built-in">' +
			'<option value=-1>none</option>' +
			'<option value=0>kick</option>' +
			'<option value=1>snare</option>' +
			'<option value=2>hihat</option>' +
			'<option value=3>conga</option>' +
			'<option value=4>cowbell</option>' +
			'</optgroup>' +
			'<optgroup label="Add Sound">' +
			'<option value=4>newsound</option>' +
			'</optgroup>'
		).addClass('select').size(80).parent(polybox).position(0, 60).center('horizontal');
		let soundLoop = null;
		// Listener to update soundLoop fxn
		select.changed(() => {
			let wasPlaying = false;

			// If there's a current soundloop playing on the
			// module, stop and remove it from array
			if (soundLoops[polybox.value() - 1] != null) {
				wasPlaying = soundLoops[polybox.value() - 1].isPlaying;
				if (wasPlaying) { soundLoops[polybox.value() - 1].stop(); }
				soundLoops[(polybox.value() - 1)] = null;
			}
			// Create new sound loop
			soundLoop = new p5.SoundLoop(() => {
				freeSounds[select.value()].play();
			});
			soundLoop.interval = normalizeTempo(startDiv);
			soundLoops[(polybox.value() - 1)] = soundLoop;

			if(wasPlaying) { soundLoops[polybox.value() - 1].syncedStart(masterLoop); }
		});

		// Start button activates loop or stops
		let start = createButton('Start').addClass('select').parent(polybox).position(0,130).center('horizontal');
		start.mousePressed(() => {
			if(select.value() != -1) {
				if(start.html() == 'Start') {
					soundLoops[polybox.value() - 1].syncedStart(masterLoop);
				}
				else {
					soundLoops[polybox.value() - 1].stop();
				}
			}
			start.html(start.html() == 'Start' ? 'Stop' : 'Start');
		});

		exit.mousePressed(() => {
			// Pop from arrays
			boxes.splice(polybox.value() - 1, 1);
			ids.splice(polybox.value() - 1, 1);
			divisions.splice(polybox.value() - 1, 1);
			divDisplays.splice(polybox.value() - 1, 1);

			// Stop sound loop and remove from array
			if (soundLoops[polybox.value() - 1] != null) { soundLoops[polybox.value() - 1].stop();}
			soundLoops[polybox.value() - 1] = null;

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

function normalizeTempo(inTempo) {
	return 1.0 * startDiv / inTempo;
}

function markListener(element){
	element.mouseOver(() => {
		element.style('background-color', "#F2C9ED");
	})
	element.mouseOut(() => {
		element.style('background-color', color(0,0,0,0));
	})
}

// Allow for keyboard drums
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


// let polyapp, myCanvas;
// let ids = [];
// let boxes = [];
// let divisions = [];
// let divDisplays = [];
// let soundLoops = [];
// let startDiv = 4;
// let freeSounds = [];
// let masterLoop;


// function setup() {
// 	noCanvas();

// 	polyapp = new Poly("Polybeat");

// 	// Load Sounds : Kick, snare, hihat, conga, cowbell
// 	for (var i = 0; i < 5; i++) {
// 		freeSounds.push(loadSound('./resources/sounds/drums/' + i + '.mp3'));
// 	}

// 	// Master loop for modules to slave off of
// 	masterLoop = new p5.SoundLoop(() => {
// 		// Nothing happens, just used to sync all loops
// 	});
// 	masterLoop.start();
// }

// function draw() {
// 	// Update each divisions display
// 	for (var i = 0; i < divDisplays.length; i++) {
// 		divDisplays[i].html('Divisions: ' + divisions[i].value());
// 		if (soundLoops[i] != null) {
// 			soundLoops[i].interval = normalizeTempo(divisions[i].value());
// 		}
// 	}
// }

// class Poly {
// 	constructor(title) {
// 		this.title = title;

// 		this.add = createImg('./resources/pngs/add.png').position(10, 10).size(130, 100).style('border-radius', '10px');
// 		this.add.mousePressed(this.createPoly);
// 		markListener(this.add);

// 		this.header = select("#header").html(this.title);
// 	}
// 	createPoly() {

// 		// Poly box is the container for each beat module
// 		let polybox = createElement('div', '').addClass('polybox').value((boxes.length + 1));
// 		boxes.push(polybox);

// 		// Exit is a button for closing a module. Mouse Pressed fxn defined after all elements defined
// 		let exit = createImg('./resources/pngs/exit.png').addClass('exit').parent(polybox);

// 		// Id displays the index of module starting at 1. Updates dynamically when modules are deleted
// 		let id = createElement('div', 'beat: ' + (boxes.length)).addClass('boxtxt').parent(polybox).position(0, 10).style('font-size', '30px').center('horizontal');
// 		ids.push(id);

// 		// A slider for storing the polyrhythm division of current module
// 		let division = createSlider(1, 16, startDiv, 1).addClass('division').parent(polybox).position(0, 80).center('horizontal');
// 		divisions.push(division);

// 		// Display that shows the current division chosen
// 		let divDisplay = createElement('div', 'Division: ' + startDiv).addClass('boxtxt').addClass('divDisplay').parent(polybox).position(0, 105).style('font-size', '15px').center('horizontal');
// 		divDisplays.push(divDisplay);

// 		// Select displays the options for drum type
// 		let select = createElement('select',
// 			'<optgroup label="Built-in">' +
// 			'<option value=-1>none</option>' +
// 			'<option value=0>kick</option>' +
// 			'<option value=1>snare</option>' +
// 			'<option value=2>hihat</option>' +
// 			'<option value=3>conga</option>' +
// 			'<option value=4>cowbell</option>' +
// 			'</optgroup>' +
// 			'<optgroup label="Add Sound">' +
// 			'<option value=4>newsound</option>' +
// 			'</optgroup>'
// 		).addClass('select').size(80).parent(polybox).position(0, 60).center('horizontal');
// 		let soundLoop = null;
// 		// Listener to update soundLoop fxn
// 		select.changed(() => {
// 			let wasPlaying = false;

// 			// If there's a current soundloop playing on the
// 			// module, stop and remove it from array
// 			if (soundLoops[polybox.value() - 1] != null) {
// 				wasPlaying = soundLoops[polybox.value() - 1].isPlaying;
// 				if (wasPlaying) { soundLoops[polybox.value() - 1].stop(); }
// 				soundLoops.splice(polybox.value() - 1, 1);
// 			}
// 			// Create new sound loop
// 			soundLoop = new p5.SoundLoop(() => {
// 				freeSounds[select.value()].play();
// 			})
// 			soundLoop.interval = normalizeTempo(startDiv);
// 			soundLoops.push(soundLoop);

// 			if (wasPlaying) { soundLoop.syncedStart(masterLoop); }
// 		});

// 		// Start button activates loop or stops
// 		let start = createButton('Start').addClass('select').parent(polybox).position(0, 130).center('horizontal');
// 		start.mousePressed(() => {
// 			if (select.value() != -1) {
// 				if (start.html() == 'Start') {
// 					soundLoop.syncedStart(masterLoop);
// 				}
// 				else {
// 					soundLoop.stop();
// 				}
// 			}
// 			start.html(start.html() == 'Start' ? 'Stop' : 'Start');
// 		});



// 		exit.mousePressed(() => {
// 			// Pop from arrays
// 			boxes.splice(polybox.value() - 1, 1);
// 			ids.splice(polybox.value() - 1, 1);
// 			divisions.splice(polybox.value() - 1, 1);
// 			divDisplays.splice(polybox.value() - 1, 1);

// 			// Stop sound loop and remove from array
// 			if (soundLoops[polybox.value() - 1] != null) { soundLoops[polybox.value() - 1].stop(); }
// 			soundLoops.splice(polybox.value() - 1, 1);

// 			polybox.remove();

// 			// Reassign
// 			for (var i = 0; i < boxes.length; i++) {
// 				ids[i].html("beat: " + (i + 1));
// 				boxes[i].value(i + 1);
// 				ids[i].value(i + 1);
// 			}
// 		});
// 	}

// }

// function normalizeTempo(inTempo) {
// 	return 1.0 * startDiv / inTempo;
// }

// function markListener(element) {
// 	element.mouseOver(() => {
// 		element.style('background-color', "#F2C9ED");
// 	})
// 	element.mouseOut(() => {
// 		element.style('background-color', color(0, 0, 0, 0));
// 	})
// }

// // Allow for keyboard drums
// function keyPressed() {
// 	if (keyCode == 65) {
// 		freeSounds[0].play();
// 	}
// 	else if (keyCode == 83) {
// 		freeSounds[1].play();
// 	}
// 	else if (keyCode == 68) {
// 		freeSounds[2].play();
// 	}
// 	else if (keyCode == 70) {
// 		freeSounds[3].play();
// 	}
// 	else if (keyCode == 71) {
// 		freeSounds[4].play();
// 	}
// }


