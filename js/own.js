// todo copy color and name and color
// todo enter own
// todo modal color picker
// todo url read
// todo url write
// todo background images
// todo design

Math.seededRandom = function (foo, bar) {
	var max = Math.max(foo, bar) || 1;
	var min = Math.min(foo, bar) || 0;

	//noinspection MagicNumberJS,MagicNumberJS,MagicNumberJS
	Math.seededRandom.newSeed = (Math.seededRandom.newSeed * 9301 + 49297) % 233280;
	//noinspection MagicNumberJS
	var rnd = Math.seededRandom.newSeed / 233280;
	return min + rnd * (max - min);
};

// the initial newSeed
Math.seededRandom.newSeed = 6;

Math.seededRandom.createNewSeed = function (string) {
	var seed = 0;
	for (var i = 0; i < string.length; i++) {
		seed += string.charCodeAt(i);
		//noinspection MagicNumberJS
		seed %= 65536;
	}
	Math.seededRandom.newSeed = seed;
};

//Math.easeInOutSine = function (t) {
//	//noinspection MagicNumberJS
//	return -0.5 * (Math.cos(Math.PI * t) - 1);
//};


var makeupColor = (function () {

	//noinspection FunctionTooLongJS
	return {

		// A public variable
		data: {
			sfw: [],
			nsfw: []
		},

		mode : 'sfw',

		createNewColor: function () {

		makeupColor.pickBaseColor();

		},

		pickBaseColor: function (colorname) {

			mode = this.mode;
			colorname = colorname || makeupColor.data.colors[Math.floor(Math.random() * makeupColor.data.colors.length)];
			var names1 = makeupColor.data[mode][1];
			var names2 = makeupColor.data[mode][2];
			var name = names1[Math.floor(Math.random() * names1.length)] + names2[Math.floor(Math.random() * names2.length)];
			makeupColor.transformColor(name, colorname);

		},

		transformColor: function (name, colorname) {

			Math.seededRandom.createNewSeed(name);
			var colorObject = $.Color(colorname);
			var hue = colorObject.hue();
			var saturation = colorObject.saturation();
			var lightness = colorObject.lightness();

			switch (colorname) {

				case 'black':

					//noinspection MagicNumberJS,MagicNumberJS
					hue = Math.seededRandom(0, 360);
					//noinspection MagicNumberJS,MagicNumberJS
					lightness = Math.seededRandom(0, 0.15);
					//noinspection MagicNumberJS,MagicNumberJS
					saturation = Math.seededRandom(0, 0.15);
					break;

				case 'white':

					//noinspection MagicNumberJS,MagicNumberJS
					hue = Math.seededRandom(0, 360);
					//noinspection MagicNumberJS,MagicNumberJS
					lightness = Math.seededRandom(0.85, 1);
					//noinspection MagicNumberJS,MagicNumberJS
					saturation = Math.seededRandom(0, 0.15);
					break;

				case 'grey':

					//noinspection MagicNumberJS,MagicNumberJS
					hue = Math.seededRandom(0, 360);
					//noinspection MagicNumberJS,MagicNumberJS
					lightness = Math.seededRandom(0.15, 0.85);
					//noinspection MagicNumberJS,MagicNumberJS
					saturation = Math.seededRandom(0, 0.15);
					break;

				case 'silver':

					//noinspection MagicNumberJS,MagicNumberJS
					hue = Math.seededRandom(0, 360);
					//noinspection MagicNumberJS,MagicNumberJS
					lightness += Math.seededRandom(-0.15, 0.15);
					//noinspection MagicNumberJS,MagicNumberJS
					saturation = Math.seededRandom(0, 0.15);
					break;

				default:

					//noinspection MagicNumberJS,MagicNumberJS
					hue += Math.seededRandom(-18, 18);
					//noinspection MagicNumberJS,MagicNumberJS
					lightness += Math.seededRandom(-0.2, 0.2);
					//noinspection MagicNumberJS,MagicNumberJS
					saturation += Math.seededRandom(-0.2, 0.2);
					break;

			}

			colorObject = colorObject.hsla([hue, saturation, lightness]);

			$('#swatch').animate({backgroundColor: colorObject});
			$('#1').text(name + ' ' + colorname);
			$('#2').text(colorObject.toHexString());
			//noinspection MagicNumberJS
			var background = colorObject.rgba({alpha: 0.8}).saturation(saturation * 0.5).lightness(lightness * 0.1);
			//noinspection MagicNumberJS,MagicNumberJS
			$('.wrapper').animate({backgroundColor: $.Color(background)});
		}
	};

})();

$(document).ready(function () {

	$('.js_modeswitch_sfw').on('click', function () {
		makeupColor.mode = 'sfw';
		makeupColor.createNewColor();
	});

	$('.js_modeswitch_nsfw').on('click',function () {
		makeupColor.mode = 'nsfw';
		makeupColor.createNewColor();
	});

	$('.js_createNewColor').on('click', function () {
		makeupColor.createNewColor()
	});
	makeupColor.createNewColor();
});

