// Color Cycling in HTML5 Canvas
// BlendShift Technology conceived, designed and coded by Joseph Huckaby
// Copyright (c) 2001-2002, 2010 Joseph Huckaby.
// Released under the LGPL v3.0: http://www.opensource.org/licenses/lgpl-3.0.html


var CanvasCycle = {
	
	ctx: null,
	imageData: null,
	clock: 0,
	inGame: false,
	bmp: null,
	globalTimeStart: (new Date()).getTime(),
	inited: false,
	optTween: null,
	winSize: null,
	globalBrightness: 1.0,
	lastBrightness: 0,
	sceneIdx: -1,
	highlightColor: -1,
	defaultMaxVolume: 0.5,
	
	settings: {
		showOptions: false,
		targetFPS: 60,
		zoomFull: false,
		blendShiftEnabled: true,
		speedAdjust: 1.0,
		sound: true
	},

	contentSize: {
		width: 640,
		optionsWidth: 0,
		height: 480,
		scale: 1.0
	},

	init: function() {
		// called when DOM is ready
		if (!this.inited) {
			this.inited = true;
			$('container').style.display = 'block';
		
			this.handleResize();
		
			// pick starting scene
			// var initialSceneIdx = Math.floor( Math.random() * scenes.length );
			var initialSceneIdx = 0;
			
			// populate scene menu
			var html = '';
			html += '<select id="fe_scene" onChange="CanvasCycle.switchScene(this)">';
			for (var idx = 0, len = scenes.length; idx < len; idx++) {
				var scene = scenes[idx];
				html += '<option value="'+scene.name+'" '+((idx == initialSceneIdx) ? ' selected="selected"' : '')+'>'+scene.title+'</option>';
			}
			html += '</select>';
			$('d_scene_selector').innerHTML = html;
			
			// force settings
			this.maxZoom();
		
			this.loadImage( scenes[initialSceneIdx].name );
			this.sceneIdx = initialSceneIdx;

			
			setInterval(this.jumpScene.bind(this, 1), 3600000);
		}
	},

	jumpScene: function(dir) {
		// next or prev scene
		this.sceneIdx += dir;
		if (this.sceneIdx >= scenes.length) this.sceneIdx = 0;
		else if (this.sceneIdx < 0) this.sceneIdx = scenes.length - 1;
		$('fe_scene').selectedIndex = this.sceneIdx;
		this.switchScene( $('fe_scene') );
	},

	switchScene: function(menu) {
		// switch to new scene (grab menu selection)
		this.stopSceneAudio();
		
		var name = menu.options[menu.selectedIndex].value;
		this.sceneIdx = menu.selectedIndex;
		
		if (ua.mobile) {
			// no transitions on mobile devices, just switch as fast as possible
			this.inGame = false;
			
			this.ctx.clearRect(0, 0, this.bmp.width, this.bmp.height);
			this.ctx.fillStyle = "rgb(0,0,0)";
			this.ctx.fillRect (0, 0, this.bmp.width, this.bmp.height);
			
			CanvasCycle.globalBrightness = 1.0;
			CanvasCycle.loadImage( name );
		}
		else {
			TweenManager.removeAll({ category: 'scenefade' });
			TweenManager.tween({
				target: { value: this.globalBrightness, newSceneName: name },
				duration: Math.floor( this.settings.targetFPS / 2 ),
				mode: 'EaseInOut',
				algo: 'Quadratic',
				props: { value: 0.0 },
				onTweenUpdate: function(tween) {
					CanvasCycle.globalBrightness = tween.target.value;
				},
				onTweenComplete: function(tween) {
					CanvasCycle.loadImage( tween.target.newSceneName );
				},
				category: 'scenefade'
			});
		}
	},

	loadImage: function(name) {
		// load image JSON from the server
		this.stop();
		this.showLoading();
		
		// var url = 'image.php?file='+name+'&callback=CanvasCycle.processImage';
		var url = window.location + 'images/' + name + '.LBM.json';
		fetch(url).then(resp => resp.json()).then(json => {
			CanvasCycle.processImage(json);
		});
	},
	
	showLoading: function() {
		// show spinning loading indicator
		var loading = $('d_loading');
		loading.style.left = '' + Math.floor( ((this.contentSize.width * this.contentSize.scale) / 2) - 16 ) + 'px';
		loading.style.top = '' + Math.floor( ((this.contentSize.height * this.contentSize.scale) / 2) - 16 ) + 'px';
		loading.show();
	},
	
	hideLoading: function() {
		// hide spinning loading indicator
		$('d_loading').hide();
	},

	processImage: function(img) {
		// initialize, receive image data from server
		this.bmp = new Bitmap(img);
		this.bmp.optimize();
	
		// $('d_debug').innerHTML = img.filename;
		
		var canvas = $('mycanvas');
		if (!canvas.getContext) return; // no canvas support
	
		if (!this.ctx) this.ctx = canvas.getContext('2d');
		this.ctx.clearRect(0, 0, this.bmp.width, this.bmp.height);
		this.ctx.fillStyle = "rgb(0,0,0)";
		this.ctx.fillRect (0, 0, this.bmp.width, this.bmp.height);
	
		if (!this.imageData) {
			if (this.ctx.createImageData) {
				this.imageData = this.ctx.createImageData( this.bmp.width, this.bmp.height );
			}
			else if (this.ctx.getImageData) {
				this.imageData = this.ctx.getImageData( 0, 0, this.bmp.width, this.bmp.height );
			}
			else return; // no canvas data support
		}
		
		if (ua.mobile) {
			// no transition on mobile devices
			this.globalBrightness = 1.0;
		}
		else {
			this.globalBrightness = 0.0;
			TweenManager.removeAll({ category: 'scenefade' });
			TweenManager.tween({
				target: { value: 0 },
				duration: Math.floor( this.settings.targetFPS / 2 ),
				mode: 'EaseInOut',
				algo: 'Quadratic',
				props: { value: 1.0 },
				onTweenUpdate: function(tween) {
					CanvasCycle.globalBrightness = tween.target.value;
				},
				category: 'scenefade'
			});
		}
		
		
		this.startScene();
	},
	
	run: function () {
		// start main loop
		if (!this.inGame) {
			this.inGame = true;
			this.animate();
		}
	},
	
	stop: function() {
		// stop main loop
		this.inGame = false;
	},

	animate: function() {
		// animate one frame. and schedule next
		if (this.inGame) {
			var colors = this.bmp.palette.colors;
	
			if (this.settings.showOptions) {
				for (var idx = 0, len = colors.length; idx < len; idx++) {
					var clr = colors[idx];
					var div = $('pal_'+idx);
					div.style.backgroundColor = 'rgb(' + clr.red + ',' + clr.green + ',' + clr.blue + ')';
				}
		
			}
	
			this.bmp.palette.cycle( this.bmp.palette.baseColors, GetTickCount(), this.settings.speedAdjust, this.settings.blendShiftEnabled );
			if (this.highlightColor > -1) {
				this.bmp.palette.colors[ this.highlightColor ] = new Color(255, 255, 255);
			}
			if (this.globalBrightness < 1.0) {
				// bmp.palette.fadeToColor( pureBlack, 1.0 - globalBrightness, 1.0 );
				this.bmp.palette.burnOut( 1.0 - this.globalBrightness, 1.0 );
			}
			this.bmp.render( this.imageData, (this.lastBrightness == this.globalBrightness) && (this.highlightColor == this.lastHighlightColor) );
			this.lastBrightness = this.globalBrightness;
			this.lastHighlightColor = this.highlightColor;
	
			this.ctx.putImageData( this.imageData, 0, 0 );
	
			TweenManager.logic( this.clock );
			this.clock++;
			this.scaleAnimate();
			if (this.inGame) setTimeout( function() { CanvasCycle.animate(); }, 1000 / this.settings.targetFPS );
		}
	},

	scaleAnimate: function() {
		// handle scaling image up or down
		if (this.settings.zoomFull) {
			// scale up to full size
			var totalNativeWidth = this.contentSize.width + this.contentSize.optionsWidth;
			var maxScaleX = (this.winSize.width) / totalNativeWidth;
		
			var totalNativeHeight = this.contentSize.height;
			var maxScaleY = (this.winSize.height) / totalNativeHeight;
		
			var maxScale = Math.min( maxScaleX, maxScaleY );
		
			if (this.contentSize.scale != maxScale) {
				this.contentSize.scale += ((maxScale - this.contentSize.scale) / 8);
				if (Math.abs(this.contentSize.scale - maxScale) < 0.001) this.contentSize.scale = maxScale; // close enough
			
				var sty = $('mycanvas').style; 
			
				if (ua.webkit) sty.webkitTransform = 'translate3d(0px, 0px, 0px) scale('+this.contentSize.scale+')';
				else if (ua.ff) sty.MozTransform = 'scale('+this.contentSize.scale+')';
				else if (ua.op) sty.OTransform = 'scale('+this.contentSize.scale+')';
				else sty.transform = 'scale('+this.contentSize.scale+')';
				
				sty.marginRight = '' + Math.floor( (this.contentSize.width * this.contentSize.scale) - this.contentSize.width ) + 'px';
				// sty.marginTop = '' + Math.floor(  this.contentSize.height ) / 2 + 'px';
				$('d_header').style.width = '' + Math.floor(this.contentSize.width * this.contentSize.scale) + 'px';
				this.repositionContainer();
			}
		}
		else {
			// scale back down to native
			if (this.contentSize.scale > 1.0) {
				this.contentSize.scale += ((1.0 - this.contentSize.scale) / 8);
				if (this.contentSize.scale < 1.001) this.contentSize.scale = 1.0; // close enough
			
				var sty = $('mycanvas').style; 
			
				if (ua.webkit) sty.webkitTransform = 'translate3d(0px, 0px, 0px) scale('+this.contentSize.scale+')';
				else if (ua.ff) sty.MozTransform = 'scale('+this.contentSize.scale+')';
				else if (ua.op) sty.OTransform = 'scale('+this.contentSize.scale+')';
				else sty.transform = 'scale('+this.contentSize.scale+')';
				
				sty.marginRight = '' + Math.floor( (this.contentSize.width * this.contentSize.scale) - this.contentSize.width ) + 'px';
				$('d_header').style.width = '' + Math.floor(this.contentSize.width * this.contentSize.scale) + 'px';
				this.repositionContainer();
			}
		}
	},
	
	repositionContainer: function() {
		// reposition container element based on inner window size
		var div = $('container');
		if (div) {
			this.winSize = getInnerWindowSize();
			div.style.left = '' + Math.floor((this.winSize.width / 2) - (((this.contentSize.width * this.contentSize.scale) + this.contentSize.optionsWidth) / 2)) + 'px';
			div.style.top = '' + Math.floor((this.winSize.height / 2) - ((this.contentSize.height * this.contentSize.scale) / 2)) + 'px';			
		}
	},

	handleResize: function() {
		// called when window resizes
		this.repositionContainer();
		if (this.settings.zoomFull) this.scaleAnimate();
	},
	
	saveSettings: function() {
		// removed
	},
	
	startScene: function() {
		// ignore audio, we don't support it
		this.hideLoading();
		this.run();
	},
	
	stopSceneAudio: function() {
		// fade out and stop audio for current scene
		var scene = scenes[ this.sceneIdx ];
		if (scene.sound && this.settings.sound && window.Audio && this.audioTrack) {
			var track = this.audioTrack;
			
			if (ua.iphone || ua.ipad) {
				// no transition here, so just stop sound
				track.pause();
			}
			else {
				TweenManager.removeAll({ category: 'audio' });
				TweenManager.tween({
					target: track,
					duration: Math.floor( CanvasCycle.settings.targetFPS / 2 ),
					mode: 'EaseOut',
					algo: 'Linear',
					props: { volume: 0 },
					onTweenComplete: function(tween) {
						// ff has weird delay with volume fades, so allow sound to continue
						// will be stopped when next one starts
						if (!ua.ff) track.pause();
					},
					category: 'audio'
				});
			}
		}
	},

	maxZoom: function() {
		this.settings.zoomFull = true;
		this.saveSettings();
	},
	
	withinHoursOf: function(hours, time) {
		let fromToTime = Math.abs(new Date().getTime() - time.getTime());
		let hoursSinceToTime = fromToTime / 1000 / 60 / 60;
		return hoursSinceToTime <= hours;
	},

	bestWeatherMatchScene: function(position) {
		console.log("Getting weather", position);
		Weather.getWeatherFor(position.coords.latitude, position.coords.longitude, (weather) => {
			if (weather === null) {
				console.error("No weather!");
				return;
			}
			let currentWeatherName = Weather.codeToWeather(weather.weather[0].id);
			console.log("Weather:", currentWeatherName);
			
			// Find weather-matching scenes
			let matches = scenes.filter(scene => scene.weather.toUpperCase() == currentWeatherName.toUpperCase());
			console.log("Matching weather scenes", matches);

			// Now try and match time of day
			let sunrise = new Date(weather.sys.sunrise * 1000);
			let sunset = new Date(weather.sys.sunset * 1000);
			let now = new Date();
			let isDay = now > sunrise && now < sunset;
			
			let validTimes;
			if(isDay) {
				validTimes = ["DAY"];
				let midday = new Date((sunrise.getTime() + sunset.getTime()) / 2);

				// morning or afternoon?
				validTimes.push(now < midday ? "MORNING" : "AFTERNOON");

				// if within an hour of midday, that's valid
				if(CC.withinHoursOf(1, midday)) {
					validTimes.push("NOON");
				}
			} else {
				validTimes = [
					"NIGHT"
				];
			}

			// if within an hour of sunset, evening is valid
			if(CC.withinHoursOf(1, sunset)) {
				validTimes.push("EVENING");
			}
			
			console.log("Valid times", validTimes);
			let fullMatches = matches.filter(scene => validTimes.includes(scene.time.toUpperCase()));
			console.log("Full matches", fullMatches);
			
			let choice;
			// perfect match is possible
			if(fullMatches.length > 0) {
				// avoid cycling on every check of weather
				if(fullMatches.includes(scenes[this.sceneIdx])) {
					console.log("Current scene valid (perfect match)");
					choice = scenes[this.sceneIdx];
				} else {
					choice = fullMatches[Random(fullMatches.length)];
				}
			}
			// otherwise match weather
			else if(matches.length > 0) {
				// avoid cycling on every check of weather
				if(matches.includes(scenes[this.sceneIdx])) {
					console.log("Current scene valid (weather match)");
					choice = scenes[this.sceneIdx];
				} else {
					choice = matches[Random(matches.length)];
				}
			}
			// otherwise, don't change
			else {
				console.log("Current scene valid (no alternative)");
				choice = scenes[this.sceneIdx];
			}

			let newSceneIndex = scenes.indexOf(choice);
			// return if we're going to change to the same scene
			if(this.sceneIdx == newSceneIndex ) return;
			this.sceneIdx = newSceneIndex;
			$('fe_scene').selectedIndex = this.sceneIdx;
			CC.switchScene( $('fe_scene') );
		});

	}

};

var CC = CanvasCycle; // shortcut

let updateWithWeatherTime = function () {
	console.log("Checking for scene change");
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(CC.bestWeatherMatchScene);
	} else {
		CC.bestWeatherMatchScene("London");
		console.error("No geolocation");
	}
}
updateWithWeatherTime();
// update every 2 minutes
setInterval(updateWithWeatherTime, 60 * 1000 * 2);

