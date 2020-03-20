// let polyApp;
// let freeSounds = [];
// let modules = [];
// let play_speed = 2;
// let num_playing = 0;
// let select_options = '';
// let draw_speed = 5;
//
// const START_BEAT = 4;
//
//
// function setup() {
// 	noCanvas();
//
//    polyApp = new Poly("Polybeat");
//
//    // Load Sounds : Kick, snare, hihat, conga, cowbell
// 	for(var i = 0; i < 5; i++) {
// 		freeSounds.push(loadSound('resources/sounds/drums/' + i + '.mp3'));
// 	}
//
//    select_options =  '<optgroup label="Audio Samples">' +
//                      '<option value=0>kick</option>' +
//                      '<option value=1>snare</option>' +
//                      '<option value=2>hihat</option>' +
//                      '<option value=3>conga</option>' +
//                      '<option value=4>cowbell</option>';
//
//    custom_draw();
// }
//
// function custom_draw() {
// 	if (focused) {
// 		for (var i = 0; i < modules.length; ++i) {
// 	      modules[i]["divDisplay"].html('Divisions: ' + modules[i]["division"].value());
//
//          if ( modules[i]['loop'].looping() )
//             modules[i]['loop'].step_one_frame(deltaTime);
// 	   }
//       setTimeout(custom_draw, 5);
//       fill(255);
//       rect(0, window.innerHeight - 50, window.innerWidth, 50);
// 	}
//    else setTimeout(custom_draw, 1000);
// }
//
// class Poly {
//    constructor(title) {
// 		this.title = title;
//
// 		this.add = createImg('./resources/pngs/add.png', 'add_button').position(10,10).size(130,100).style('border-radius', '10px');
// 		this.add.mousePressed(this.createPoly);
// 		this.add.mouseOver(() => {
// 			this.add.style('background-color', "#F2C9ED");
// 		});
// 		this.add.mouseOut(() => {
// 			this.add.style('background-color', color(0,0,0,0));
// 		});
//
// 		this.header = select("#header").html(this.title);
//
// 	}
//
//    createPoly() {
//
// 		let loop = new PolyLoop();
//
//       // Poly box is the container for each beat module
//       // let polybox = document.createElement('div');
//       // polybox.className = "polybox";
//       // polybox.value = .value(0);
//       let polybox = createElement('div', '').addClass('polybox').value(modules.length);
//
//       // Id displays the index of module starting at 1. Updates dynamically when modules are deleted
//       // let id = createElement('div', 'beat: ').addClass('boxtxt').parent(polybox).position(0, 10).style('font-size', '30px').center('horizontal');
//       let id = createElement('div', 'beat: ' + (modules.length + 1)).addClass('boxtxt').parent(polybox).position(0, 10).style('font-size', '30px').center('horizontal');
//
//       // Exit is a button for closing a module. Mouse Pressed fxn defined after all elements defined
//       let exit = createImg('./resources/pngs/exit.png', 'exit').addClass('exit').parent(polybox);
//
//       exit.mousePressed(() => {
//          modules.splice(polybox.value(), 1);
//
//          if (loop.is_playable() && loop.is_playing()) {
//             loop.stop_sound();
//          }
//          polybox.remove();
//
//          for (var i = 0; i < modules.length; ++i) {
//             modules[i]["polybox"].value(i);
//             modules[i]["id"].html('beat: ' + (i+1));
//          }
// 		});
//
//
//       // A slider for storing the polyrhythm division of current module
//       let division = createSlider(1, 16, START_BEAT, 1).addClass('division').parent(polybox).position(0,80).center('horizontal');
//
//       division.changed(() => {
//          loop.set_rate(division.value());
// 			if (loop.is_playable() && loop.looping()) {
// 				loop.enter_loops();
// 			}
//       });
//
//       // Display that shows the current division chosen
//       let divDisplay = createElement('div', 'Division: ' + START_BEAT).addClass('boxtxt').addClass('divDisplay').parent(polybox).position(0, 105).style('font-size', '15px').center('horizontal');
//
//       // Select displays the options for drum type
//       let select = createElement('select', select_options).addClass('select').size(80).parent(polybox).position(0, 60).center('horizontal');
//
//       // Listener to update soundLoop fxn
// 		select.changed(() => {
//          loop.set_sound(select.value());
// 		});
//
// 		// Start button activates loop or stops
// 		let start = createButton('Start').addClass('select').parent(polybox).position(0,130).center('horizontal');
// 		start.mousePressed(() => {
//          if (loop.is_playable()) {
//             start.html(loop.looping() ? 'Start' : 'Stop');
//             loop.toggle_state();
//          }
// 			else {
// 				start.html("Start");
// 			}
// 		});
//
//       let importDisplay = createElement('div', '💚Import New Sound💚').addClass('boxtxt').addClass('importDisplay').parent(polybox).position(0, 240).style('font-size', '15px').center('horizontal');
//
//       let add_sound = createFileInput( (file) => {
//             if (file.type === 'audio') {
//                console.log(file);
//                freeSounds.push(loadSound(file.data));
//                var briefname = file.name.substring(0, file.name.length - 1 - file.subtype.length);
//                select_options += '<option value=' + (freeSounds.length - 1) + '>' + briefname + '</option>';
//                select.html(select_options);
//             }
//             else {
//                alert('🤦fam... audio only🤦');
//             }
//        }, 'true').addClass('file_input').parent(polybox).position(60,270);
//
//       modules.push({
//          "polybox"    : polybox,
//          "id"         : id,
//          "division"   : division,
//          "divDisplay" : divDisplay,
//          "loop"       : loop
//       });
//    }
// }
//
// class PolyLoop {
// 	constructor () {
//       this.next_play_time = 0;
//       this.play_rate      = START_BEAT;
//       this.sound_file     = freeSounds[0];
//       this.is_looping     = false;
//       this.count          = 0;
//       this.EPS_TIME       = 10; // msec
//    }
//
//    is_playable() {
//       return !(this.sound_file == null || this.sound_file == undefined);
//    }
//
//    is_playing() {
//       return this.sound_file.isPlaying();
//    }
//
//    looping() {
//       return this.is_looping;
//    }
//
//    increment_count () {
// 		this.count = (this.count + 1) % this.play_rate;
// 	}
//
//    reset_npt() {
//       this.next_play_time = 0;
//    }
//
// 	set_npt() {
// 		this.next_play_time += 1000 * this.play_rate / play_speed;
// 	}
//
//    set_rate(new_rate) {
//       this.play_rate = new_rate;
//    }
//
//    toggle_state() {
//       this.is_looping = !this.is_looping;
//       if (this.is_looping) { this.enter_loops(); ++num_playing; }
//       else { this.next_play_time = 0; this.sound_file.stop(); --num_playing; }
//    }
//
// 	play_sound() {
// 		if (this.is_playable()) {
//          if (this.is_playing()) this.sound_file.stop();
//          this.sound_file.play();
//       }
// 	}
//
//    set_sound(sound_idx) {
//       var was_playing = false;
//       if (this.is_playing()) { this.sound_file.stop(); was_playing = true; }
//       if (sound_idx < freeSounds.length)
//          this.sound_file = freeSounds[sound_idx];
//       if (was_playing) this.play_sound();
//    }
//
//    stop_sound() {
//       if (this.is_playable()) this.sound_file.stop();
//    }
//
// 	enter_loops() {
// 	   if (num_playing == 0) {
// 			this.play_sound();
// 			this.set_npt();
// 	   }
// 	   else {
// 			for (var i = 0; i < modules.length; ++i) {
// 				if (modules[i]['loop'].looping()) {
// 					this.next_play_time = modules[i]['loop'].next_play_time;
// 				}
// 			}
// 	   }
// 	}
//
//    step_one_frame(delta_val) {
//       this.next_play_time -= delta_val;
//       if (this.next_play_time < this.EPS_TIME) {
//          this.increment_count();
//          this.play_sound();
//          this.set_npt();
//       }
//    }
// }
//
// // Allow for keyboard drums
// function keyPressed() {
// 	if      (keyCode == 65) freeSounds[0].play();
// 	else if (keyCode == 83) freeSounds[1].play();
// 	else if (keyCode == 68) freeSounds[2].play();
// 	else if (keyCode == 70) freeSounds[3].play();
// 	else if (keyCode == 71) freeSounds[4].play();
// }
