var soundboard = (function () {


	// private map for the sounds
	var soundInstances = {};
	// private map for key presses
	var keymap = {};

	return {

		//read data from html, load sounds, create instances, map keys
		init: function () {

			var audioPath = "sounds/";
			createjs.Sound.alternateExtensions = ["mp3"];


			// go through each button
			$('.play').each(function (i, element) {

				// read name and sourcefile
				var soundName = $(element).data('sound');
				// load sound and give id
				createjs.Sound.registerSound(audioPath + soundName + '.ogg', soundName);
				// create instance
				soundInstances[soundName] = createjs.Sound.createInstance(soundName);

				// register click handler for element
				$(element).click(function () {

					soundboard.playAudio($(this).data('sound'));

				});

				// read key keys are detected only uppercase
				var key = $(element).data('key').toUpperCase().charCodeAt(0);
				// store into map
				keymap[key] = soundName;

			});

			// add listener for keyboard presses

			$(document).bind('keydown', function (e) {

				//check if key is mapped and call soundinstance
				console.log(e.keyCode);
				if (keymap[e.keyCode]) {
					soundboard.playAudio(keymap[e.keyCode])
				}
			});


		},

		playAudio: function (id) {

			if ((soundInstances[id].playState) != 'playSucceeded') {
				createjs.Sound.stop();
				soundInstances[id].play();
			} else {
				createjs.Sound.stop();
			}
		}


	};

})();



$(document).ready(function () {


	soundboard.init();

});


