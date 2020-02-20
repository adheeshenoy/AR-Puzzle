// defines the click behavior for the buttons
var marker11;
var marker12;
var marker13;
var marker14;
var marker21;
var marker22;
var marker23;
var marker24;
var startBtn = document.getElementById("start");
startBtn.addEventListener("click", function() {
	btnClicked("start");
});
var pauseResetBtn = document.getElementById("pauseReset");
pauseResetBtn.style.display = "none";
pauseResetBtn.addEventListener("click", function() {
	btnClicked("pauseReset");
});
var submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click", function() {
	btnClicked("submitBtn");
});
var timer = document.getElementById("timerDisplay"); // gets the timer from the document

// Define UI behaviors
const submitUI = document.getElementById("input");
submitUI.style.display = "none";

class Stopwatch {
	constructor() {
		this.reset();
		this.running = false;
		console.log("watch created");
	}

	// increments the stopwatch by 100 milliseconds and returns the time as a string
	tick(tickMillis) {
		// increments the stopwatch by the number of milliseconds passed
		this.millis += tickMillis;

		/* check if seconds or millisecs have overflowed, and increment higher value. (mins just go to infinity) */
		if (this.millis === 1000) {
			this.millis = 0;
			this.secs++;
		}
		if (this.secs === 60) {
			this.secs = 0;
			this.mins++;
		}

		/* update the strings for the timer values */
		this.milStr = "" + this.millis / 100;
		this.secStr = this.secs < 10 ? "0" + this.secs + "." : this.secs + ".";
		this.minStr = this.mins < 10 ? "0" + this.mins + ":" : this.mins + ":";

		this.running = true;
		return this.timeStr();
	}

	// sets all the values to 0 and false
	reset() {
		this.millis = 0;
		this.secs = 0;
		this.mins = 0;
		this.milStr = "0";
		this.secStr = "00.";
		this.minStr = "00:";

		return this.timeStr();
	}

	getMillTime() {
		var returnTime = 0;
		returnTime += this.millis;
		returnTime += this.secs * 1000;
		returnTime += this.mins * 60000;
		return returnTime;
	}

	// functions for starting, pausing, and checking whether the stopwatch is running
	pause() {
		this.running = false;
	}
	start() {
		this.running = true;
	}
	isRunning() {
		return this.running;
	}

	// returns the formatted time string from the stopwatch
	timeStr() {
		return "" + this.minStr + this.secStr + this.milStr;
	}
}

//class for holding the stopwatch and other game variables
class arGame {
	constuctor() {
		this.gameOver = true;
		this.completed = false;
		this.scores = [[], [], []]; // names is scores[0], times is scores[1]
		this.minDist = 2.5;
	}

	getDistances() {
		var distance = new Array(10);
		console.log(
			Math.round(
				marker11
					.getAttribute("position")
					.distanceTo(marker12.getAttribute("position")) * 100
			) / 100
		);
		console.log("qwertyui");
		distance.push(
			Math.round(
				marker11
					.getAttribute("position")
					.distanceTo(marker12.getAttribute("position")) * 100
			) / 100
		);
		distance.push(
			Math.round(
				marker12
					.getAttribute("position")
					.distanceTo(marker13.getAttribute("position")) * 100
			) / 100
		);
		distance.push(
			Math.round(
				marker13
					.getAttribute("position")
					.distanceTo(marker14.getAttribute("position")) * 100
			) / 100
		);
		distance.push(
			Math.round(
				marker21
					.getAttribute("position")
					.distanceTo(marker22.getAttribute("position")) * 100
			) / 100
		);
		distance.push(
			Math.round(
				marker22
					.getAttribute("position")
					.distanceTo(marker23.getAttribute("position")) * 100
			) / 100
		);
		distance.push(
			Math.round(
				marker23
					.getAttribute("position")
					.distanceTo(marker24.getAttribute("position")) * 100
			) / 100
		);
		distance.push(
			Math.round(
				marker11
					.getAttribute("position")
					.distanceTo(marker21.getAttribute("position")) * 100
			) / 100
		);
		distance.push(
			Math.round(
				marker12
					.getAttribute("position")
					.distanceTo(marker22.getAttribute("position")) * 100
			) / 100
		);
		distance.push(
			Math.round(
				marker13
					.getAttribute("position")
					.distanceTo(marker23.getAttribute("position")) * 100
			) / 100
		);
		distance.push(
			Math.round(
				marker14
					.getAttribute("position")
					.distanceTo(marker24.getAttribute("position")) * 100
			) / 100
		);
		for (let i = 0; i < distance.length; i++) {
			console.log(distance[i]);
		}
		return distance;
	}

	// says whether the puzzle is completed
	isCompleted() {
		return this.completed;
	}

	getScores() {
		return this.scores;
	}

	// sets the game state to currently being solved
	startGame() {
		this.completed = false;
		this.gameOver = false;
	}

	// takes in a list of distances and a minimum distance. If any of the distances are greater than the minimum
	// distance, the game is not completed.
	checkCompleted() {
		var newDists = this.getDistances();
		this.completed = true;
		for (let dist of newDists)
			if (dist >= this.minDist || dist <= 0.000001) {
				this.completed = false;
				break;
			}

		return this.completed;
	}

	// trys to add a new score into the list of scores
	// if the new score is in the top 5, it will be added
	tryToAddScore(name, timeStr, totalMillis) {}
}

// function that progresses the game
var gameLoop = function() {
	if (watch.isRunning()) timer.innerHTML = watch.tick(100); // updates the time in the UI
	if (game.checkCompleted())
		// gets the current distances and checks if the puzzle is completed.
		endGame(); // ends the game if the puzzle is completed
};

// starts the game
function startGame() {
	// hides the start button after it is called and changes the Reset text to Pause
	startBtn.style.display = "none";
	pauseResetBtn.style.display = "inline";
	pauseResetBtn.innerHTML = "Pause";
	var iframe = document.getElementById("ARframe").contentWindow.document;
	// starts the watch
	watch.start();
	marker11 = iframe.getElementById("marker1");
	marker12 = iframe.getElementById("marker2");
	marker13 = iframe.getElementById("marker3");
	marker14 = iframe.getElementById("marker4");
	marker21 = iframe.getElementById("marker5");
	marker22 = iframe.getElementById("marker6");
	marker23 = iframe.getElementById("marker7");
	marker24 = iframe.getElementById("marker8");

	// !!TODO!! use clearInterval(gameInterval) somewhere to end the game loop
	gameInterval = setInterval(gameLoop, 100);
}

// pauses the game
function pauseGame() {
	clearInterval(gameInterval); // stops the game loop
	startBtn.style.display = "none"; // makes the start button visible
	pauseResetBtn.innerHTML = "Reset";
	watch.pause(); // pauses the watch
}

// completely resets the game
function resetGame() {
	timer.innerHTML = watch.reset();
	startBtn.style.display = "inline";
	pauseResetBtn.style.display = "none";
}

//Game is completed
function endGame() {
	clearInterval(gameInterval); // stops the game loop
	watch.pause();
	displayEndScreen();
}

function processEnd() {
	// var newTimeStr = Take from HTML
	var newMilli = watch.getMillTime();
	// var name = Name submitted
	// game.tryToAddScore(name, newTimeStr, newMilli);
	// writeScoresToFile(game.getScores());

	// TODO: replace this with

	resetGame();
}

var btnClicked = function(btnName) {
	switch (btnName) {
		case "start":
			startGame();
			break;
		case "pauseReset":
			if (watch.isRunning()) pauseGame();
			else resetGame();
			break;
		case "submitBtn":
			processEnd();
			break;
		default:
			console.log("DEFAULT STATEMENT REACHED");
			break;
	}
};

// defines the global game variables
var watch = new Stopwatch();
var game = new arGame();

function displayEndScreen() {
	const gameSection = document.getElementById("game");
	const ARFrame = document.getElementById("ARframe");
	pauseResetBtn.innerHTML = "Reset";
	gameSection.className = "game-end";
	ARFrame.className = "frame-end";
	submitUI.style.display = "inline";
}
