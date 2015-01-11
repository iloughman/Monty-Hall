var Game = function(){
	
	var door1 = {
		doorNum : 1,
		picked : false,
		prize : false,
		opened : false,
	}

	var door2 = {
		doorNum : 2,
		picked : false,
		prize : false,
		opened : false,
	}

	var door3 = {
		doorNum : 3,
		picked : false,
		prize : false,
		opened : false,
	}

	var doors = [door1,door2,door3];

	// Not needed but useful for debugging. Otherwise I can't access door1-3, hmmm, maybe a better way to do this.
	this.doors = function(){
		return [door1,door2,door3];
	}

	// Randomly select a door to hold the prize and an inital contestant guess
	var prizeDoor = Math.floor(Math.random()*3)+1;
	var guessDoor = Math.floor(Math.random()*3)+1;

	// Assign to door objects the random door guessed and the random door containing prize
	this.assignPrize = function(){
		for (var i = 0; i < 3; i++){
			if (doors[i].doorNum == prizeDoor){
				doors[i].prize = true;
			}
		}
		for (var i = 0; i < 3; i++){
			if (doors[i].doorNum == guessDoor){
				doors[i].picked = true;
			}
		}
	}

	// Randomly assign the door (which, of course, is empty) that is shown to the contestant.
	this.assignShownDoor = function(){
		var shownDoorNum = Math.floor(Math.random()*3)+1;
		while (shownDoorNum == prizeDoor || shownDoorNum == guessDoor){
			shownDoorNum = Math.floor(Math.random()*3)+1;
		}
		for (var i = 0; i < 3; i++){
			if (doors[i].doorNum == shownDoorNum){
				doors[i].opened == true;
			}
		}
	}

	
	// Determine if the contestant selected the correct door if he decides not to switch.
	this.determineWin = function(){
		var wins = 0;
		for (var i = 0; i < 3; i++){
			if (doors[i].picked == true && doors[i].prize == true){
			wins++;
			}
		}
		return wins;
	}
}

var totalWins = 0;

for (var i = 0; i < 1000 ; i++){
	var game = new Game();
	game.assignPrize();
	game.assignShownDoor();
	totalWins = totalWins + game.determineWin();
}

var winPercent = (totalWins/1000)*100;
var lostPercent = ((1000-totalWins)/1000)*100;
winPercent = Math.round(winPercent*100)/100;
lostPercent = Math.round(lostPercent*100)/100;

console.log("Here's what happened when you didn't change doors:")
console.log("You won "+totalWins+" times! That's "+winPercent+"%.");
console.log("You lost "+(1000-totalWins)+" times! That's "+lostPercent+"%.");



