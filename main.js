let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 800;

ctx.fillStyle = "green";
ctx.fillRect(150, 150, 100, 100);

ctx.fillStyle = "rgb(1, 2, 3)";
ctx.fillRect(500, 200, 80, 150);

ctx.strokeRect(400, 400, 100, 100);
ctx.clearRect(100, 100, 100, 100);

ctx.beginPath();
ctx.fillStyle = "blue";
ctx.moveTo(300, 300);
ctx.lineTo(350, 350);
ctx.lineTo(450, 250);
ctx.fill();
// ctx.stroke();

ctx.beginPath();
ctx.arc(500, 700, 50, 0, Math.PI * 2, false);
//ctx.stroke();
ctx.fill();

let circles = [
  { x: 200, y: 700, velX: -15.0, velY: -15.0, radius: 50 },
  { x: 250, y: 300, velX: 15.0, velY: -15.0, radius: 50 },
  { x: 500, y: 200, velX: -15, velY: 15, radius: 50 },
  { x: 300, y: 600, velX: 15, velY: 15, radius: 50 },
];

let lastTime = Date.now();

// tick <-> tick tick tick tick

let paused = true;

canvas.addEventListener("click", function () {
  paused = !paused;

  if (paused === false) {
    lastTime = Date.now();
    requestAnimationFrame(tick);
  }
});

function tick() {
  let now = Date.now();
  let deltaTime = (now - lastTime) / 1000;
  lastTime = now;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < circles.length; i++) {
    let circle = circles[i];
    ctx.beginPath();
    ctx.fillStyle = "yellow";
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, false);
    ctx.fill();

    // 5 pixlar per frame (körs 10 ggr per sekund) = 50 pixlar per sekund
    // 10 pixlar per frame (körs 5 ggr per sekund) = 50 pixlar per sekund

    circle.x += circle.velX * deltaTime * 5;
    circle.y += circle.velY * deltaTime;

    if (circle.x - circle.radius <= 0) {
      circle.velX *= -1;
      circle.x = circle.radius;
    } else if (circle.x + circle.radius >= canvas.width) {
      circle.velX *= -1;
      circle.x = canvas.width - circle.radius;
    }

    if (circle.y - circle.radius <= 0) {
      circle.velY *= -1;
      circle.y = circle.radius;
    } else if (circle.y + circle.radius >= canvas.height) {
      circle.velY *= -1;
      circle.y = canvas.height - circle.radius;
    }

    for (let l = i; l < circles.length; l++) {
        let otherCircle = circles[l];

        let distanceX = circle.x - otherCircle.x;
        let distanceY = circle.y - otherCircle.y;
        let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        if (distance <= circle.radius + otherCircle.radius) {
            circle.velX *= -1;
            circle.velY *= -1;
            otherCircle.velX *= -1;
            otherCircle.velY *= -1;
        }
    }
  }

  if (paused === false) {
    requestAnimationFrame(tick);
  }
}

//requestAnimationFrame(tick);
