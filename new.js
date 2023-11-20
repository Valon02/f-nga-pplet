let canvas = document.getElementById('gamecanvas');
let ctx = canvas.getContext('2d');


// basket
let basket = {
    x: 200,
    y: 500-50,
    width: 100,
    height: 50,
}

// apples
let apple = {
    x: 100,
    y: 0,
    velY: 50,
    width: 30,
    height: 30,
}

// create event listeners
window.addEventListener('keydown', function(event) {
    if(event.key === 'ArrowRight') {
        moveRight(basket)
    }
})
window.addEventListener('keydown', function(event) {
    if(event.key === 'ArrowLeft') {
        moveLeft(basket)
    }
})

// move functions
function moveRight() {
    console.log('right')
    basket.x = basket.x + 5;
}
function moveLeft() {
    console.log('left')
    basket.x = basket.x - 5;
}

let lastTime = Date.now();
let spawnTimer = 0;
// call tick animation
function tick() {
    let now = Date.now();
    let deltaTime = (now - lastTime) / 1000;
    lastTime = now;
    spawnTimer += deltaTime;

    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // call functions
    tickPlayer(basket);
    tickApple(apple, deltaTime);

    if(spawnTimer >= 5) {
        spawnApples();
        spawnTimer = 0;
    }


    // keep within canvas
    if(basket.x >= 400) {
        basket.x = 400
    } 
    if(basket.x <= 0) {
        basket.x = 0
    } 

    requestAnimationFrame(tick);

}

//create player
function tickPlayer(basket) {
    ctx.fillStyle = "green"
    ctx.fillRect(basket.x, basket.y, basket.width, basket.height);
}

function tickApple(apple, deltaTime) {
    ctx.fillStyle = "red"
    ctx.fillRect(apple.x, apple.y, apple.width, apple.height);

    apple.y += apple.velY * deltaTime;
}

function spawnApples() {
    let apple = { x: 100, y: 0, velY: 50, width: 30, height: 30,}

    apple.push(apple);
}


requestAnimationFrame(tick);


// if (apple.y + apple.radius > canvas.height) {
 //   apple.y = 0;