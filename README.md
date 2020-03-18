# Polybeat
* Polyrhythm sequencer with GUI for easy use. 
* Created with the p5.js framework for easy DOM manipulation.

### About
* Synchronization of individual loops uses deltaTime in between drawn frames
* Declares two classes:
  * Poly: Creates app header icons and registers createPoly() function to generate module
  * Loop: Contains information about an instance of a module and when to play the sound_file
* Keyboard characters \[a, s, d, f, g\] can be used to play the built-in 808 as a drum pad
