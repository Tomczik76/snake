

let x = 0;
let y = 0;

const circle = function(ctx, x, y, color, size) {
  const draw = (x, y, color) => {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2, true);
    ctx.fillStyle = color
    ctx.fill();
    ctx.closePath();
  }

  const move = (x, y) => {
    ctx.clearRect(0,0, 500, 500);
    draw(x, y, color);
  }

  canvas.addEventListener('mousemove', (e) => {
      move(e.clientX, e.clientY)
  })

  draw(x, y, color);
};


circle(ctx, 100, 100, 'green', 50);





