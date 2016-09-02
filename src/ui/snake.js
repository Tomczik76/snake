export default (ctx, cords, scale) => {
  cords.forEach(([x, y], i) => {
    ctx.fillStyle = i === 0 ? 'red' : 'green';
    ctx.fillRect(x * 10 * scale, y * 10 * scale, 10 * scale, 10 * scale);
  })
}