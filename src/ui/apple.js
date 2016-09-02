export default (ctx, apples, scale) => {
  apples.forEach(([x,y]) => {
    ctx.fillStyle = 'red';
    ctx.fillRect(x * 10 * scale, y * 10 * scale, 10 * scale, 10 * scale);
  });
}