let freeSounds = [];
let polyapp;
let startBeat = 4;
let modules = [];
const EPS_TIME = 10;
let num_playing = 0;

function setup() {
	noCanvas();

   polyapp = new Poly("Polybeat");

   // Load Sounds : Kick, snare, hihat, conga, cowbell
	for(var i = 0; i < 5; i++) {
		freeSounds.push(loadSound('./resources/sounds/drums/' + i + '.mp3'));
	}

}

function draw() {
   // Update values
   for (var i = 0; i < modules.length; ++i) {
      modules[i]["divDisplay"].html('Divisions: ' + modules[i]["division"].value());
      if (modules[i]['loop'].is_playing)
         modules[i]['loop'].next_play_time -= deltaTime;
   }
   // Play sound if necessary
   for (var i = 0; i < modules.length; ++i) {
      if ( !modules[i]['loop'].is_playing ) continue;
      if (modules[i]['loop'].next_play_time < EPS_TIME) {
         console.log("Playing: " + modules[i]['loop'].next_play_time);
         modules[i]['loop'].sound_file.play();
         modules[i]['loop'].next_play_time += modules[i]['loop'].play_rate;
         console.log("Next play: " + modules[i]['loop'].next_play_time);
      }
   }
}

class Poly {
   constructor(title) {
		this.title = title;

		this.add = createImg('./resources/pngs/add.png', 'add_button').position(10,10).size(130,100).style('border-radius', '10px');
		this.add.mousePressed(this.createPoly);
		markListener(this.add);

		this.header = select("#header").html(this.title);
	}

   createPoly() {

      let loop = {
         next_play_time : 0,          // scheduled next play
         play_rate      : 400,         // In msec
         sound_file     : null,       // Auto first sound
         is_playing     : false,      // bool play
         sync           : 0           // index of modules to sync with
      };

      // Poly box is the container for each beat module
      // let polybox = createElement('div', '').addClass('polybox').value(0);
      let polybox = createElement('div', '').addClass('polybox').value(modules.length);

      // Exit is a button for closing a module. Mouse Pressed fxn defined after all elements defined
      let exit = createImg('./resources/pngs/exit.png', 'exit').addClass('exit').parent(polybox);

      // Id displays the index of module starting at 1. Updates dynamically when modules are deleted
      // let id = createElement('div', 'beat: ').addClass('boxtxt').parent(polybox).position(0, 10).style('font-size', '30px').center('horizontal');
      let id = createElement('div', 'beat: ' + (modules.length + 1)).addClass('boxtxt').parent(polybox).position(0, 10).style('font-size', '30px').center('horizontal');

      // A slider for storing the polyrhythm division of current module
      let division = createSlider(1, 16, startBeat, 1).addClass('division').parent(polybox).position(0,80).center('horizontal');

      division.changed(() => {
         loop.play_rate = 100 * division.value();
      });

      // Display that shows the current division chosen
      let divDisplay = createElement('div', 'Division: ' + startBeat).addClass('boxtxt').addClass('divDisplay').parent(polybox).position(0, 105).style('font-size', '15px').center('horizontal');

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

      // Listener to update soundLoop fxn
		select.changed(() => {
         loop.sound_file = freeSounds[select.value()];
		});

		// Start button activates loop or stops
		let start = createButton('Start').addClass('select').parent(polybox).position(0,130).center('horizontal');
		start.mousePressed(() => {
         if (loop.sound_file != null) {
            start.html(loop.is_playing ? 'Start' : 'Stop');
            loop.is_playing = !loop.is_playing;
            if (loop.is_playing) { enter_loops(loop); ++num_playing; }
            else           { loop.next_play_time = 0; --num_playing; }
         }
		});

		exit.mousePressed(() => {
         modules.splice(polybox.value(), 1);
         polybox.remove();

         for (var i = 0; i < modules.length; ++i) {
            modules[i]["polybox"].value(i);
            modules[i]["id"].html('beat: ' + (i+1));
         }
		});

      var module_obj = {
         "polybox"    : polybox,
         "exit"       : exit,
         "id"         : id,
         "division"   : division,
         "divDisplay" : divDisplay,
         "select"     : select,
         "start"      : start,
         "loop"       : loop
      };
      modules.push(module_obj);
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


function enter_loops(loop) {
   if (num_playing == 0) {
      loop.sound_file.play();
      loop.next_play_time = loop.play_rate;
   }
   else if (loop.sync < modules.length){
      loop.next_play_time = modules[loop.sync]['loop'].next_play_time;
   }
   else {
      loop.next_play_time = modules[0]['loop'].next_play_time;
   }
   console.log("Next play: " + loop.next_play_time);
}

// Allow for keyboard drums
function keyPressed() {
	if (keyCode == 65) {
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
