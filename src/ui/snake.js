export default (ctx, cords, scale) => {
  cords.forEach(([x, y], i) => {
    ctx.fillStyle = i === 0 ? '#32CD32' : '#008000';
    ctx.fillRect(x * 10 * scale, y * 10 * scale, 10 * scale, 10 * scale);
  })
}