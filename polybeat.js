let polyApp;
let freeSounds = [];
let sound_container;
let modules = [];
let play_speed = 5;
let num_playing = 0;
let draw_speed = 5;
let hrc; // High res clock
let is_focused = true;

const START_BEAT = 4;

class HighResClock {
   constructor () {
      this.first   = 0;
      this.second  = 0;
   }

   start () { this.first  = performance.now(); }
   stop  () { this.second = performance.now(); }

   delta() {
      return this.second - this.first;
   }
}

window.onblur   = () => { is_focused = false; }
window.onfocus  = () => { is_focused = true; }
document.onblur = window.onblur;
document.focus  = window.focus;

function start() {
   sound_container = document.getElementById('audio-samples');

   hrc = new HighResClock();
   hrc.start();
   custom_draw();
}

function custom_draw() {
   hrc.stop();
	for (var i = 0; i < modules.length; ++i) {
      if ( modules[i]['loop'].looping() )
         modules[i]['loop'].step_one_frame(hrc.delta());
   }
   setTimeout(custom_draw, 4);
   hrc.start();
}

function createPolyBox () {
   for (var i = 0; i < modules.length; ++i) {
      modules[i]['polybox'].style.border = 'none';
   }

   // Poly box is the container for each beat module
   let polybox       = document.createElement('div');
   polybox.className = 'polybox';
   polybox.onclick   = function () {
      for (var i = 0; i < modules.length; ++i) {
         modules[i]['polybox'].style.border = 'none';
      }
      this.style.border = '2px solid black';
   }
   return polybox;
}


function createPoly() {

   let loop = new PolyLoop();

   let polybox = createPolyBox();
   container.insertBefore(polybox, null);

   // Id displays the index of module starting at 1. Updates dynamically when modules are deleted
   let id = {
      div : document.createElement('div'),
      idx : modules.length
   };
   id.div.innerHTML = 'beat: ' + (id.idx + 1);
   id.div.className = 'txt title';
   polybox.appendChild(id.div);


   // Exit is a button for closing a module. Mouse Pressed fxn defined after all elements defined
   let exit       = document.createElement('img');
   exit.src       = './resources/imgs/exit.png';
   exit.className = 'exit';
   exit.onmouseup = () => {
      modules.splice(id.idx, 1);

      if (loop.is_playable() && loop.is_playing()) {
         loop.stop_sound();
      }
      polybox.remove();

      for (var i = 0; i < modules.length; ++i) {
         modules[i]["id"].idx = i;
         modules[i]["id"].div.innerHTML = 'beat: ' + (i+1);
      }
   };
   polybox.appendChild(exit);



   // Display that shows the current division chosen
   let div_display = document.createElement('div');
   div_display.innerHTML = 'Division: ' + START_BEAT;
   div_display.className = 'txt div-display';
   polybox.appendChild(div_display);



   // A slider for storing the polyrhythm division of current module
   let division       = document.createElement('input');
   division.type      = 'range';
   division.min       = '1';
   division.max       = '16';
   division.value     = START_BEAT;
   division.step      = '1';
   division.className = 'slider';
   division.oninput = function() {
      loop.set_rate(parseInt(this.value));
      if (loop.is_playable() && loop.looping()) {
         loop.enter_loops();
      }
      div_display.innerHTML = 'Division: ' + this.value;
   };
   polybox.appendChild(division);



   // Select displays the options for drum type
   let select = document.createElement('select');
   select.innerHTML = '<optgroup label="Audio Samples">' +
                     '<option value=0>kick</option>' +
                     '<option value=1>snare</option>' +
                     '<option value=2>hihat</option>' +
                     '<option value=3>conga</option>' +
                     '<option value=4>cowbell</option>';
   select.className = 'options';
   select.onchange  = function () {
      loop.set_sound(this.value);
   };
   polybox.appendChild(select);


   let start = document.createElement('button');
   start.innerHTML = 'Start';
   start.className = 'start-toggle';
   start.onmouseup = function () {
      if (loop.is_playable()) {
         this.innerHTML = loop.looping() ? 'Start' : 'Stop';
         loop.toggle_state();
      }
      else { start.html("Start"); }
   };
   polybox.appendChild(start);


   let import_display = document.createElement('div');
   import_display.innerHTML = '💛Import New Sound 💛';
   import_display.className = 'txt import-display';
   polybox.appendChild(import_display);


   let add_sound = document.createElement('input');
   add_sound.type      = 'file';
   add_sound.accept    = 'audio/*';
   add_sound.multiple  = 'true';
   add_sound.className = 'file-input';
   add_sound.oninput    = function (event) {
      const files = event.target.files;
      console.log(files);
      for (let file of files) {
         var prev_selected_value = select.value;

         var new_sound = document.createElement('audio');
         new_sound.src = URL.createObjectURL(file);
         sound_container.appendChild(new_sound);

         select.innerHTML += '<option value=' + (sound_container.children.length - 1) + '>' + file.name + '</option>';
         select.value = prev_selected_value;
      }
   }
   polybox.appendChild(add_sound);

   modules.push({
      "polybox"    : polybox,
      "id"         : id,
      "division"   : division,
      "loop"       : loop
   });
}

class PolyLoop {
	constructor () {
      this.next_play_time = 0;
      this.play_rate      = START_BEAT;
      // this.sound_file     = freeSounds[0];
      this.sound_file     = sound_container.children[0];
      this.is_looping     = false;
      this.count          = 0;
      this.EPS_TIME       = 10; // msec
   }

   is_playable() {
      return !(this.sound_file == null || this.sound_file == undefined);
   }

   is_playing() {
      return this.sound_file.currentTime > 0 || !this.sound_file.paused;
   }

   looping() {
      return this.is_looping;
   }

   increment_count () {
		this.count = (this.count + 1) % this.play_rate;
	}

   reset_npt() {
      this.next_play_time = 0;
   }

	set_npt() {
		this.next_play_time += 1000 * this.play_rate / play_speed;
	}

   set_rate(new_rate) {
      this.play_rate = new_rate;
   }

   toggle_state() {
      this.is_looping = !this.is_looping;
      if (this.is_looping) { this.enter_loops(); ++num_playing; }
      else { this.next_play_time = 0; this.stop_sound(); --num_playing; }
   }

	play_sound() {
		if (this.is_playable()) {
         if (this.is_playing()) this.stop_sound();
         this.sound_file.play();
      }
	}

   set_sound(sound_idx) {
      var was_playing = false;
      if (this.is_playing()) { this.stop_sound(); was_playing = true; }
      if (sound_idx < sound_container.children.length)
         this.sound_file = sound_container.children[sound_idx];
      if (was_playing) this.play_sound();
   }

   stop_sound() {
      if (this.is_playable()) {
         this.sound_file.pause();
         this.sound_file.currentTime = 0;
      }
   }

	enter_loops() {
	   if (num_playing == 0) {
			this.play_sound();
			this.set_npt();
	   }
	   else {
			for (var i = 0; i < modules.length; ++i) {
				if (modules[i]['loop'].looping()) {
					this.next_play_time = modules[i]['loop'].next_play_time;
				}
			}
	   }
	}

   step_one_frame(delta_val) {
      this.next_play_time -= delta_val;
      if (this.next_play_time < this.EPS_TIME) {
         this.increment_count();
         this.play_sound();
         this.set_npt();
      }
   }
}

// Allow for keyboard drums
function keyPressed() {
	if      (keyCode == 65) sound_container.children[0].play();
	else if (keyCode == 83) sound_container.children[1].play();
	else if (keyCode == 68) sound_container.children[2].play();
	else if (keyCode == 70) sound_container.children[3].play();
	else if (keyCode == 71) sound_container.children[4].play();
}
