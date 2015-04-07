// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // Set bugs to random positions off the map so they appear over time
    this.x = -Math.floor((Math.random()*1000)+1);

    // Set bugs to either row 1, 2, or 3
    this.y = Math.floor((Math.random()*3)+1);

    //Set speed between 1 and 4
    this.speed = Math.floor((Math.random()*4)+1);
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //Increment position by speed, while multiplying by dt
    this.x = (this.x + this.speed * dt);

    //Checking to see if player has hit the enemy
    if (Math.floor(this.x) === player.x) {
        if(Math.floor(this.y) === player.y) {
            
            //Set player back to original position
            player.x = 2;
            player.y = 5;

            //Set player score to zero
            player.score = 0;
            document.getElementById("score").innerHTML = player.score;
        }
    }

}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    //Adjusted x and y to fit grid images
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83);
}

//Setting up Player

var Player = function() {
        //Set image for player
        this.sprite = 'images/char-boy.png';

        //Set position for player
        this.x = 2;
        this.y = 5;
        this.score = 0;
}

Player.prototype.update = function(dt) {
}

Player.prototype.render = function() {
    //Adjusted x and y to fit grid images
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83);
}

Player.prototype.handleInput = function(key) {
    //Checks if up key is hit
    if (key === "up") {
        //CMoves player up unless on 1st row
        if(this.y > 1) {
            this.y--;
        }
        //Checks if first row and increases score/set player back to original row
        else if(this.y === 1) {
            this.y = 5;
            this.score++;
            document.getElementById("score").innerHTML = this.score;
        }
    }
    else if (key === "right") {
        //Moves player right unless on last column
        if(this.x < 4){
            this.x++;
        }
    }
    else if (key === "left") {
        //Moves player left unless on first column
        if(this.x > 0) {
            this.x--;
        }
    }
    else {
        //Moves player down unless on original row
        if(this.y < 5)
        {
            this.y++;
        }
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player();

var allEnemies = [];
for (var i=0; i<1000; i++) {
    allEnemies[i] = new Enemy();
}

//var allEnemies = [new Enemy(),new Enemy(),new Enemy(),new Enemy(),new Enemy(),new Enemy(),new Enemy(),new Enemy(),new Enemy(),new Enemy(),new Enemy(),new Enemy(),new Enemy(),new Enemy(),new Enemy(),new Enemy(),new Enemy(),new Enemy(),new Enemy(),new Enemy(),new Enemy(),new Enemy(),new Enemy(),new Enemy(),new Enemy(),new Enemy(),new Enemy(),new Enemy(),new Enemy(),new Enemy()];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

