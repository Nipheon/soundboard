// create shortcut for soundjs
var audio = createjs.Sound;

var soundboard = (function () {

	// private map for the sound instances
	var soundInstances = {};
	// private map for mapped keys
	var keymap = {};
	// helper, used to limit sounds to 1
	var whatsPlaying;

	// function called when a sound finishs playing
	var playFinished = function () {
		// remove the playing class from the html element
		$('#' + whatsPlaying.id).removeClass('playing');
		// delete the currently played sound instance
		whatsPlaying = false;
	};

	// public methods
	return {

		//read data from html, load sounds, create instances, map keys
		init: function () {

			var audioPath = "sounds/";
			audio.alternateExtensions = ["mp3"];


			// go through each play button
			$('.play').each(function (i, element) {

				// read name and sourcefile
				var soundName = $(element).data('sound');
				// load sound and give name
				audio.registerSound(audioPath + soundName + '.ogg', soundName, soundName);
				// create instance for this sound
				soundInstances[soundName] = audio.createInstance(soundName);
				// attach soundName to each instance because soundjs is stupid and does not attach the id
				// to events
				soundInstances[soundName].id = soundName;

				// write id to html element
				$(element).attr('id', soundName);

				// register click handler for element
				$(element).click(function () {

					soundboard.playAudio(soundName);

				});

				// read keys from HTML and convert (keys are detected only uppercase for keypress)
				var key = $(element).data('key').toUpperCase().charCodeAt(0);
				// store into key map
				keymap[key] = soundName;

			});

			// add listener for keyboard presses

			$(document).bind('keydown', function (e) {
				//check if key is in the map and then call player function
				if (keymap[e.keyCode]) {
					soundboard.playAudio(keymap[e.keyCode])
				}
			});


		},

		playAudio: function (soundName) {

			// check if a sound is currently playing
			if (whatsPlaying) {
				// stop, hammertime
				whatsPlaying.stop();
				whatsPlaying.removeAllEventListeners();
				// reset style
				$('#' + whatsPlaying.id).removeClass('playing');
			}

			// was the trigger for the same sound?
			if (whatsPlaying == soundInstances[soundName])
			// sound is already stopped, just destroy helper
			{
				whatsPlaying = false;
			}

			// play the new sound
			else {

				// copy the requested sound to the helper
				whatsPlaying = soundInstances[soundName];
				// start playing
				whatsPlaying.play();
				// add event for playack  complete
				whatsPlaying.addEventListener("complete", playFinished);
				// toggle css
				$('#' + soundName).addClass('playing');
			}
		}


	};

})();


$(document).ready(function () {

	soundboard.init();

});



