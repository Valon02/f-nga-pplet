//Variabler

let canvas = document.getElementById('gamecanvas');
let ctx = canvas.getContext('2d');



// basket
let basket = {
    x: 300,
    y: 700,
    velX: 0,
    width: 200,
    height: 100,
    color: "brown",
}

// apple
let apple = {
    x: 400,
    y: 0,
    velY: 0,
    width: 40,
    height: 40,
    color: "red",
}

ctx.fillStyle = "red";
ctx.fillRect(apple.x, apple.y, apple.width, apple.height)

let moving = false;
let movingDuration = 0;

// FUNCTIONS
// handle player
function tickPlayer(basket, deltaTime) {
    ctx.fillStyle = "brown"
    ctx.fillRect(basket.x, basket.y, basket.width, basket.height);

    /*
    basket.x += basket.velX * deltaTime;
    basket.velX += 2 * deltaTime;
    */
}




// Handle event listeners
window.addEventListener("keydown", function (event) {
  if (event.key === "ArrowRight") {
    moving = true;
    console.log('go right! ' + moving)
    tickPlayer(basket);
  } else if (event.key === "ArrowLeft") {
    console.log('LEEEEFT')
  }
});

window.addEventListener("keyup", function (event) {
  if (event.key === "ArrowRight" ) {
    moveRight(basket);
    console.log('stop moving')
  } 
  if (event.key === "ArrowLeft" ) {
    console.log('stop moving')
  } 
});

function moveRight(basket) {
    console.log('vi kom hit')
    basket.x = basket.x + basket.velX;
    //basket.velX = -120 + -movingDuration * 100;
    moving = false;
    movingDuration = 0;
}

function moveLeft(basket) {
     
}

// tick animation
let lastTime = Date.now();
let spawnTimer = 2;
let totalObstaclesSpawned = 0;
let level = 0;
let points = 0;

function tick() {
  let now = Date.now();
  let deltaTime = (now - lastTime) / 1000;
  lastTime = now;
  
  //spawnTimer -= deltaTime;
  //points += deltaTime;

  if (moving) {
    movingDuration += deltaTime;
    console.log('in the if sats')
    if (movingDuration >= 1) {
      move(basket);
    }
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.font = "25px serif";
  ctx.fillStyle = "black";
  ctx.fillText("Points: " + points.toFixed(0), 500, 30);

  // call tick player
  tickPlayer(basket, deltaTime);

  /*
  for (let i = 0; i < obstacles.length; i++) {
    let obstacle = obstacles[i];w
    if (tickObstacle(obstacle, deltaTime)) {
      obstacles.splice(i, 1);
      i--;
    }
    

    if (isColliding(player, obstacle)) {
      //alert("You lost!");
      lastTime = Date.now();
      points = 0;
      obstacles = [];
      requestAnimationFrame(tick);
      return;
    }
  }
  */

  if (spawnTimer <= 0) {
    spawnObstacle();
    spawnTimer = 2 + Math.random() * 5;
  }

  requestAnimationFrame(tick);
  
    if(basket.x >= 60) {
        basket.x = 600
    } 

}


requestAnimationFrame(tick);


// call functions
//tickPlayer(basket);

