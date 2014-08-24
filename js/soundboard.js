var soundboard = (function () {

	// private map for the sounds
	var soundInstances = {};
	// private map for key presses
	var keymap = {};

	// public methods
	return {

		//read data from html, load sounds, create instances, map keys
		init: function () {

			var audioPath = "sounds/";
			audio.alternateExtensions = ["mp3"];


			// go through each button
			$('.play').each(function (i, element) {

				// read name and sourcefile
				var soundName = $(element).data('sound');
				// load sound and give id
				audio.registerSound(audioPath + soundName + '.ogg', soundName);
				// create instance for this sound
				soundInstances[soundName] = audio.createInstance(soundName);

				// register click handler for button
				$(element).click(function () {

					soundboard.playAudio($(this).data('sound'));

				});

				// read keys from HTML and convert (keys are detected only uppercase for keypress)
				var key = $(element).data('key').toUpperCase().charCodeAt(0);
				// store into key map
				keymap[key] = soundName;

			});

			// add listener for keyboard presses

			$(document).bind('keydown', function (e) {
				//check if key is in the map and then call soundinstance
				if (keymap[e.keyCode]) {
					soundboard.playAudio(keymap[e.keyCode])
				}
			});


		},

		playAudio: function (id) {

			// check if sound is not currently playing
			if ((soundInstances[id].playState) != 'playSucceeded') {
				// stop all other sounds
				audio.stop();
				//play sound
				soundInstances[id].play();
			// else stop all sounds
			} else {
				audio.stop();
			}
		}


	};

})();



$(document).ready(function () {

	// create shortcut for soundjs
	audio = createjs.Sound;

	soundboard.init();

});


