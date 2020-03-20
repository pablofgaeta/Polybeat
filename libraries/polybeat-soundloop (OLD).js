/************ VERSION WITH NO RATIOS **************/

/*
let freeSounds = [];
let polyapp;
let startBeat = 4;
let modules = [];
const EPS_TIME = 10;
let num_playing = 0;
let play_speed = 100;



function setup() {
	noCanvas();

   polyapp = new Poly("Polybeat");

   // Load Sounds : Kick, snare, hihat, conga, cowbell
	for(var i = 0; i < 5; i++) {
		freeSounds.push(loadSound('./resources/sounds/drums/' + i + '.mp3'));
	}

}

function draw() {
   for (var i = 0; i < modules.length; ++i) {
      modules[i]["divDisplay"].html('Divisions: ' + modules[i]["division"].value());
		if ( !modules[i]['loop'].is_playing ) continue;

      modules[i]['loop'].next_play_time -= deltaTime;
      if (modules[i]['loop'].next_play_time < EPS_TIME) {
			increment_count (modules[i]['loop']);
         modules[i]['loop'].sound_file.play();
         set_next_play (modules[i]['loop']);
      }
   }
}

function increment_count (loop) {
	loop.count = (loop.count + 1) % loop.play_rate;
}

function set_next_play(loop) {
	loop.next_play_time += loop.play_rate * play_speed;
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
         next_play_time : 0,           // scheduled next play
         play_rate      : 4,           // In msec
         sound_file     : null,        // Auto first sound
         is_playing     : false,       // bool play
			count          : 0
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
         loop.play_rate = division.value();
			enter_loops(loop);
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
		set_next_play (loop);
   }
   else {
		for (var i = 0; i < modules.length; ++i) {
			if (modules[i]['loop'].is_playing) {
				loop.next_play_time = modules[i]['loop'].next_play_time;
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
*/


/************ VERSION WITH RATIOS **************/



// let freeSounds = [];
// let polyapp;
// let startBeat = 4;
// let modules = [];
// const EPS_TIME = 10;
// let num_playing = 0;
// let play_speed = 100;
// let ratios = new Map();
//
//
// // let err_sum = 0;
// // let err_num = 0;
//
// function setup() {
// 	noCanvas();
//
//    polyapp = new Poly("Polybeat");
//
//    // Load Sounds : Kick, snare, hihat, conga, cowbell
// 	for(var i = 0; i < 5; i++) {
// 		freeSounds.push(loadSound('./resources/sounds/drums/' + i + '.mp3'));
// 	}
//
// }
//
// function gcd(a, b) {
//   if (b == 0)
//     return a;
//   else
//     return gcd(b, (a % b));
// }
//
// // function gcd(x, y) {
// //   if ((typeof x !== 'number') || (typeof y !== 'number'))
// //     return false;
// //   x = Math.abs(x);
// //   y = Math.abs(y);
// //   while(y) {
// //     var t = y;
// //     y = x % y;
// //     x = t;
// //   }
// //   return x;
// // }
//
// function assign_ratios () {
// 	// Clear ratios first
// 	// Size of ratios = (mod.length(mod.length-1))/2
// 	ratios.clear();
// 	var first, sec, ratio_obj;
// 	for (var i = 0; i < modules.length; ++i) {
// 		for (var j = i + 1; j < modules.length; ++j) {
// 			console.log("Entering loop: (i,j) = " + "(" + i + ", " + j + ")");
// 			first = modules[i]['loop'].play_rate;
// 			sec = modules[j]['loop'].play_rate;
// 			if (first == 0 || sec == 0) continue;
// 			ratio_obj = {
// 				a : first / gcd(first, sec),
// 				b : sec / gcd(first, sec)
// 			}
// 			// Position i * modules.length + j
// 			ratios.set(i*modules.length + j, ratio_obj);
// 			console.log("Entering (" + ratio_obj.a + ", " + ratio_obj.b + ") at " + (i*modules.length + j));
// 		}
// 	}
// 	console.log(ratios);
// }
//
// function queue_play (loop1, loop2, sync_list) {
// 	loop1.synced_play = true;
// 	sync_list.push(i);
// 	if ( !loop2.synced_play ) sync_list.push(j);
// }
//
//
// function draw() {
// 	// var sync_play_queue = [];
// 	//
// 	// var first, sec, ratio_obj;
// 	// for (var i = 0; i < modules.length; ++i) {
// 	// 	if ( !modules[i]['loop'].is_playing ) continue;
// 	// 	for (var j = i+1; j < modules.length; ++j) {
// 	// 		if ( !modules[j]['loop'].is_playing ) continue;
// 	//
// 	// 		first = modules[i]['loop'].count;
// 	// 		sec = modules[j]['loop'].count;
// 	//
// 	// 		if (first == 0 ^ sec == 0) continue;
// 	// 		else if (first != 0) {
// 	// 			ratio_obj = {
// 	// 				a : first / gcd(first, sec),
// 	// 				b : sec / gcd(first, sec)
// 	// 			};
// 	// 			// console.log(ratio_obj.a);
// 	// 			// console.log(ratio_obj.b);
// 	// 			// console.log(ratios[i*modules.length + j].a);
// 	// 			if (ratios.get(i*modules.length + j).a != ratio_obj.a ||
// 	// 			    ratios.get(i*modules.length + j).b != ratio_obj.b) {
// 	// 				continue;
// 	// 			}
// 	// 		}
// 	// 		// recorded_ratio == curr ratio
// 	// 		modules[i]['loop'].synced_play = true;
// 	// 		sync_play_queue.push(i);
// 	// 		if ( !modules[j]['loop'].synced_play ) sync_play_queue.push(j);
// 	// 		break;
// 	// 	}
// 	// }
//
//    for (var i = 0; i < modules.length; ++i) {
//       modules[i]["divDisplay"].html('Divisions: ' + modules[i]["division"].value());
//       // if ( !modules[i]['loop'].is_playing || modules[i]['loop'].synced_play) continue;
// 		if ( !modules[i]['loop'].is_playing ) continue;
//
//       modules[i]['loop'].next_play_time -= deltaTime;
//       if (modules[i]['loop'].next_play_time < EPS_TIME) {
//          // err_sum += modules[i]['loop'].next_play_time; ++err_num;
//          // console.log("Avg. Error: " + (err_sum / err_num));
// 			increment_count (modules[i]['loop']);
//          modules[i]['loop'].sound_file.play();
//          set_next_play (modules[i]['loop']);
//       }
//    }
// 	// for (var i = 0; i < sync_play_queue.length; ++i) {
// 	// 	modules[sync_play_queue[i]]['loop'].sound_file.play();
// 	// }
//
// 	// for (var i = 0; i < sync_play_queue.length; ++i) {
// 	// 	increment_count (modules[sync_play_queue[i]]['loop']);
// 	// 	modules[sync_play_queue[i]]['loop'].next_play_time = 0;
// 	// 	set_next_play (modules[sync_play_queue[i]]['loop']);
// 	// 	modules[sync_play_queue[i]]['loop'].synced_play = false;
// 	// }
//
// }
//
// function increment_count (loop) {
// 	loop.count = (loop.count + 1) % loop.play_rate;
// }
//
// function set_next_play(loop) {
// 	loop.next_play_time += loop.play_rate * play_speed;
// }
//
// class Poly {
//    constructor(title) {
// 		this.title = title;
//
// 		this.add = createImg('./resources/pngs/add.png', 'add_button').position(10,10).size(130,100).style('border-radius', '10px');
// 		this.add.mousePressed(this.createPoly);
// 		markListener(this.add);
//
// 		this.header = select("#header").html(this.title);
// 	}
//
//    createPoly() {
//
//       let loop = {
//          next_play_time : 0,           // scheduled next play
//          play_rate      : 4,           // In msec
//          sound_file     : null,        // Auto first sound
//          is_playing     : false,       // bool play
//          sync           : 0,           // index of modules to sync with
// 			synced_play    : false,
// 			count          : 0
//       };
//
//       // Poly box is the container for each beat module
//       // let polybox = createElement('div', '').addClass('polybox').value(0);
//       let polybox = createElement('div', '').addClass('polybox').value(modules.length);
//
//       // Exit is a button for closing a module. Mouse Pressed fxn defined after all elements defined
//       let exit = createImg('./resources/pngs/exit.png', 'exit').addClass('exit').parent(polybox);
//
//       // Id displays the index of module starting at 1. Updates dynamically when modules are deleted
//       // let id = createElement('div', 'beat: ').addClass('boxtxt').parent(polybox).position(0, 10).style('font-size', '30px').center('horizontal');
//       let id = createElement('div', 'beat: ' + (modules.length + 1)).addClass('boxtxt').parent(polybox).position(0, 10).style('font-size', '30px').center('horizontal');
//
//       // A slider for storing the polyrhythm division of current module
//       let division = createSlider(1, 16, startBeat, 1).addClass('division').parent(polybox).position(0,80).center('horizontal');
//
//       division.changed(() => {
//          loop.play_rate = division.value();
// 			enter_loops(loop);
// 			assign_ratios();
//       });
//
//       // Display that shows the current division chosen
//       let divDisplay = createElement('div', 'Division: ' + startBeat).addClass('boxtxt').addClass('divDisplay').parent(polybox).position(0, 105).style('font-size', '15px').center('horizontal');
//
//       // Select displays the options for drum type
//       let select = createElement('select',
//          '<optgroup label="Built-in">' +
//          '<option value=-1>none</option>' +
//          '<option value=0>kick</option>' +
//          '<option value=1>snare</option>' +
//          '<option value=2>hihat</option>' +
//          '<option value=3>conga</option>' +
//          '<option value=4>cowbell</option>' +
//          '</optgroup>' +
//          '<optgroup label="Add Sound">' +
//          '<option value=4>newsound</option>' +
//          '</optgroup>'
//       ).addClass('select').size(80).parent(polybox).position(0, 60).center('horizontal');
//
//       // Listener to update soundLoop fxn
// 		select.changed(() => {
//          loop.sound_file = freeSounds[select.value()];
// 		});
//
// 		// Start button activates loop or stops
// 		let start = createButton('Start').addClass('select').parent(polybox).position(0,130).center('horizontal');
// 		start.mousePressed(() => {
//          if (loop.sound_file != null) {
//             start.html(loop.is_playing ? 'Start' : 'Stop');
//             loop.is_playing = !loop.is_playing;
//             if (loop.is_playing) { enter_loops(loop); ++num_playing; }
//             else           { loop.next_play_time = 0; --num_playing; }
//          }
// 		});
//
// 		exit.mousePressed(() => {
//          modules.splice(polybox.value(), 1);
//          polybox.remove();
//
//          for (var i = 0; i < modules.length; ++i) {
//             modules[i]["polybox"].value(i);
//             modules[i]["id"].html('beat: ' + (i+1));
//          }
//
// 			assign_ratios();
//
// 		});
//
//       var module_obj = {
//          "polybox"    : polybox,
//          "exit"       : exit,
//          "id"         : id,
//          "division"   : division,
//          "divDisplay" : divDisplay,
//          "select"     : select,
//          "start"      : start,
//          "loop"       : loop
//       };
//       modules.push(module_obj);
//
// 		// Init ratios
// 		assign_ratios();
//    }
// }
//
// function markListener(element){
// 	element.mouseOver(() => {
// 		element.style('background-color', "#F2C9ED");
// 	})
// 	element.mouseOut(() => {
// 		element.style('background-color', color(0,0,0,0));
// 	})
// }
//
//
// function enter_loops(loop) {
//    if (num_playing == 0) {
//       loop.sound_file.play();
// 		set_next_play (loop);
//    }
//    else if (loop.sync < modules.length){
// 		for (var i = 0; i < modules.length; ++i) {
// 			if (modules[i]['loop'].is_playing) {
// 				loop.next_play_time = modules[i]['loop'].next_play_time;
// 			}
// 		}
//    }
// }
//
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
