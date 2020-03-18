let polyApp;
let freeSounds = [];
let modules = [];
let num_playing = 0;
let play_speed = 100;
let isActive = true;

const EPS_TIME = 10;
const START_BEAT = 4;


// Check window visability
document.addEventListener("visibilitychange", function() {
  isActive = document.visibilityState == 'visible';
});

function setup() {
	noCanvas();

   polyApp = new Poly("Polybeat");

   // Load Sounds : Kick, snare, hihat, conga, cowbell
	for(var i = 0; i < 5; i++) {
		freeSounds.push(loadSound('./resources/sounds/drums/' + i + '.mp3'));
	}

	custom_draw();
}

function custom_draw() {
	if (focused && isActive) {
		for (var i = 0; i < modules.length; ++i) {
	      modules[i]["divDisplay"].html('Divisions: ' + modules[i]["division"].value());
			if ( !modules[i]['loop'].is_playing ) continue;

			// Decrease time to next play by deltaTime (time in between frames)
	      modules[i]['loop'].next_play_time -= deltaTime;
	      if (modules[i]['loop'].next_play_time < EPS_TIME) {
				modules[i]['loop'].increment_count();
	         modules[i]['loop'].play_sound();
	         modules[i]['loop'].set_next_play();
	      }
	   }
	}
	setTimeout(custom_draw,20);
}

class Poly {
   constructor(title) {
		this.title = title;

		this.add = createImg('./resources/pngs/add.png', 'add_button').position(10,10).size(130,100).style('border-radius', '10px');
		this.add.mousePressed(this.createPoly);
		this.add.mouseOver(() => {
			this.add.style('background-color', "#F2C9ED");
		});
		this.add.mouseOut(() => {
			this.add.style('background-color', color(0,0,0,0));
		});

		this.header = select("#header").html(this.title);
	}

   createPoly() {

		let loop = new PolyLoop();

      // Poly box is the container for each beat module
      // let polybox = createElement('div', '').addClass('polybox').value(0);
      let polybox = createElement('div', '').addClass('polybox').value(modules.length);

      // Exit is a button for closing a module. Mouse Pressed fxn defined after all elements defined
      let exit = createImg('./resources/pngs/exit.png', 'exit').addClass('exit').parent(polybox);

      // Id displays the index of module starting at 1. Updates dynamically when modules are deleted
      // let id = createElement('div', 'beat: ').addClass('boxtxt').parent(polybox).position(0, 10).style('font-size', '30px').center('horizontal');
      let id = createElement('div', 'beat: ' + (modules.length + 1)).addClass('boxtxt').parent(polybox).position(0, 10).style('font-size', '30px').center('horizontal');

      // A slider for storing the polyrhythm division of current module
      let division = createSlider(1, 16, START_BEAT, 1).addClass('division').parent(polybox).position(0,80).center('horizontal');

      division.changed(() => {
         loop.play_rate = division.value();
			if (loop.sound_file != null && loop.is_playing) {
				loop.enter_loops();
			}
      });

      // Display that shows the current division chosen
      let divDisplay = createElement('div', 'Division: ' + START_BEAT).addClass('boxtxt').addClass('divDisplay').parent(polybox).position(0, 105).style('font-size', '15px').center('horizontal');

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
         if (select.value() > -1 && select.value() < freeSounds.length)
				loop.sound_file = freeSounds[select.value()];
		});

		// Start button activates loop or stops
		let start = createButton('Start').addClass('select').parent(polybox).position(0,130).center('horizontal');
		start.mousePressed(() => {
         if (loop.sound_file != null) {
            start.html(loop.is_playing ? 'Start' : 'Stop');
            loop.is_playing = !loop.is_playing;
            if (loop.is_playing) { loop.enter_loops(); ++num_playing; }
            else            { loop.next_play_time = 0; --num_playing; }
         }
			else {
				start.html("Start");
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

      modules.push({
         "polybox"    : polybox,
         "id"         : id,
         "division"   : division,
         "divDisplay" : divDisplay,
         "loop"       : loop
      });
   }
}

class PolyLoop {
	constructor () {
      this.next_play_time = 0;
      this.play_rate      = START_BEAT;
      this.sound_file     = null;
      this.is_playing     = false;
      this.count          = 0;
   }

	play_sound() {
		if (this.sound_file != null) this.sound_file.play();
	}

	increment_count () {
		this.count = (this.count + 1) % this.play_rate;
	}

	set_next_play() {
		this.next_play_time += this.play_rate * play_speed;
	}

	enter_loops() {
	   if (num_playing == 0) {
			this.play_sound();
			this.set_next_play();
	   }
	   else {
			for (var i = 0; i < modules.length; ++i) {
				if (modules[i]['loop'].is_playing) {
					this.next_play_time = modules[i]['loop'].next_play_time;
				}
			}
	   }
	}
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
